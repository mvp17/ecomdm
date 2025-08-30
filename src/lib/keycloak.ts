import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  //url: "http://localhost:8181/",
  url: "http://localhost:32000/",
  //url: "http://localhost:8080/",
  realm: "spring-microservices-security-realm",
  clientId: "nextjs-client",
});

export default keycloak;
