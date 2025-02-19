import { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../hook/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // フォームの入力値を管理するstate
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  // AuthContextからlogin関数を取得
  const { login } = useAuth();
  // ナビゲーション用のフック
  const navigate = useNavigate();

  // 入力値が変更されたときの処理
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // フォーム送信時の処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    // login関数を呼び出し、成功したらホームページにリダイレクト
    const success = await login(formData.username, formData.password);
    if (success) {
      navigate('/');
    } else {
      console.error('Login failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4}}>
      <Typography variant="h5" component="h1" gutterBottom>
        ログイン
      </Typography>
      {/* ユーザー名入力フィールド */}
      <TextField
        margin="normal"
        required
        id="username"
        label="ユーザー名"
        name="username"
        autoComplete="username"
        autoFocus
        value={formData.username}
        onChange={handleChange}
      />
      {/* パスワード入力フィールド */}
      <TextField
        margin="normal"
        required
        name="password"
        label="パスワード"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
      />
      {/* ログインボタン */}
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        ログイン
      </Button>

      <Box sx={{mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Typography>まだ登録してないアホは</Typography>
        <Button onClick={() => navigate('/signup')}>
          <Typography>登録</Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
