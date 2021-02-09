import React, { Component } from "react";
import base64 from "base-64";
// import AddTask from "../AddTask/AddTask";
import api from "../../services/api";

// import { login } from "../../services/auth";
import "./Login.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.get("/login", {
          headers: {
            Authorization: `Basic ${base64.encode(email + ":" + password)}`,
          },
        });
        console.log(response)
        // login(response.data.token);
        this.props.history.push("/tasks");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T",
        });
      }
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleLogin}>
          {this.state.error && <p>{this.state.error}</p>}

          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={(e) => this.setState({ email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => this.setState({ password: e.target.value })}
          />

          <button type="submit">Entrar</button>
          <hr />
        </form>
      </>
    );
  }
}

export default Login;
