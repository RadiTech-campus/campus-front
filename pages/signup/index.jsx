import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function SignUp() {
  const auth = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const confirmUser = async (e) => {
    e.preventDefault();
    try {
      const result = await auth.signUp(username, password, email);
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
      alert("회원가입 요청 실패");
    }
  };

  const executeConfirm = async (event) => {
    event.preventDefault();
    try {
      const result = await auth.confirmSignUp(username, code);
      console.log("Confirm 성공", result);
    } catch (error) {
      console.log("Confirm 실패", error);
    }
  };
  return (
    <div>
      <form noValidate onSubmit={executeConfirm}>
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="인증코드"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="button" onClick={(e) => confirmUser(e)}>
          메일인증 발송
        </button>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
