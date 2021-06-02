import React from "react";
import CarouselList from "../../components/products/home_products/CarouselList";
import "./Home.scss";
import Container from "react-bootstrap/Container";

export default function Home() {
  return (
    <>
      <div className="main with-navbar">
        <Container>
          <div className="products-wrapper">
            <CarouselList />
          </div>
        </Container>
      </div>
    </>
  );
}
