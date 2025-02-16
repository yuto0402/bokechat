import { Header } from "../components/Header";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Fab } from "@mui/material";
import { postFecth } from "../api/PostFecth";
import PostList from "../features/Home/PostList";
import { useInView } from 'react-intersection-observer';
import { useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';

const HomePage = () => {
  const { data: posts, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => {
      return postFecth({ pageParam })
    },
    staleTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage) => {
      return lastPage.next ? lastPage.next : undefined;
    }
  });

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
console.log(posts);

  return (
    <>
      <Header />

      <Box sx={{mt: 8}}>
        {isLoading || !posts ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", marginTop: '16px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{mt: 2, display: "flex", flexDirection: "column", gap: 2}}>
            <Box>
              {posts.pages.map((page, index) => {
                return (
                  <Box key={index}>
                    <PostList posts={page.results} />
                  </Box>
                );
              })}

              {isFetchingNextPage && hasNextPage &&
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                  <CircularProgress />
                </Box>
              }

              <div style={{ visibility: "hidden", height: 0 }} ref={ref}>
                <div />
              </div>
            </Box>
          </Box>
        )}

        <Fab sx={{position: "fixed", right: '24px', bottom: '100px'}} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </>
 )
}

export default HomePage;
