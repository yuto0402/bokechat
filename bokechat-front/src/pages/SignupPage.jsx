import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/api/signup/', {
        ...formData,
      });
      alert(response.data.message);
      navigate('/login');
    } catch(error){
      alert('登録に失敗しました');
      console.error(error);
    }
  };

  return(
    <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: "center", mt: 4}}>
      <Typography>BakaChatへようこそ！！</Typography>
      <Typography>あなたは貴重な時間をドブに捨てることになります。</Typography>
      <Typography sx={{mt: 2, fontSize: '20px'}}>ユーザー登録</Typography>
      <TextField
        sx={{ mt: 2 }}
        name="username"
        label="ユーザー名"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ mt: 2 }}
        name="email"
        label="メールアドレス"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        sx={{ mt: 2 }}
        name="password"
        label="パスワード"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        登録
      </Button>
    </Box>
  );
}

export default SignupPage;
