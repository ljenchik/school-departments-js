import { Container } from "react-bootstrap";
import "./css/home.css";
export const HomePage = () => {
  return (
    <Container>
        <div>
      <h3 className="title">Welcome to a happy place!</h3>
      <img
        className="home-page-image"
        src="https://thumbs.dreamstime.com/b/happy-school-children-cartoon-front-school-illustration-50839962.jpg"
      />
      </div>
    </Container>
  );
};
