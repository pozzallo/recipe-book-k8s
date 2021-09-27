FROM maven:3.6.0-jdk-8-slim
COPY src /home/app/src
COPY pom.xml /home/app
COPY src/main/resources /home/app/src/main/resources
RUN mvn -f /home/app/pom.xml clean package -Dmaven.test.skip

#
# Package stage
#
FROM openjdk:8-jre-slim
COPY --from=0 /home/app/target/recipe-book-0.0.1-SNAPSHOT.jar /usr/local/lib/recipe-book.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/recipe-book.jar"]