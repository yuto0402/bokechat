import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// AuthContextの作成
const AuthContext = createContext();

// カスタムフックの作成。他のコンポーネントでAuthContextを簡単に使用できるようにする
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // ユーザー状態と読み込み状態の管理
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // コンポーネントマウント時にローカルストレージからトークンを取得し、ユーザー情報を取得する
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetchUserInfo(token);
    } else {
      setLoading(false);
    }
  }, []);

  // トークンを使用してユーザー情報を取得する関数
  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/api/user-info/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user info', error);
    } finally {
      setLoading(false);
    }
  };

  // ログイン処理を行う関数
  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username, password });
      // トークンをローカルストレージに保存
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      // ユーザー情報を取得
      await fetchUserInfo(response.data.access);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  // ログアウト処理を行う関数
  const logout = () => {
    // ローカルストレージからトークンを削除
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // ユーザー状態をクリア
    setUser(null);
  };

  // AuthContextで提供する値
  const value = {
    user,
    setUser,
    login,
    logout,
  };

  // AuthContextProviderでラップし、childrenをレンダリング
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // childrenを必須のノードとして指定
};
