import { useMutation } from "@tanstack/react-query"
import { groupJoin } from "../../api/GroupFecth"

export const useGroupJoin = (uuid, refetch) => {
  return useMutation({
    mutationFn: () => groupJoin(uuid),
    onSuccess: () => {
      refetch();
    }
  })
}
