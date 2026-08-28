# E-commerce

Open `pom.xml` as a Maven project in IntelliJ IDEA. Set a JDK (Java 21 or newer), then run `EcommerceApplication`.

Open `http://localhost:8080` for the storefront and `http://localhost:8080/swagger-ui/index.html` for Swagger.

## Database layer

The project now uses JPA entities and repositories. By default, it saves data in a local H2 database under `data/ecommerce`, so products and users remain after an application restart. To use MySQL instead, set the `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` environment variables before starting the app.

For Render, upload this folder to GitHub and create a Blueprint from `render.yaml`.
