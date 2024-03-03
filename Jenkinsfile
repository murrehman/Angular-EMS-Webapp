pipeline {
    agent any

    
    // tools {
    //    // jdk 'Java17' // These are the names in Jenkins for JDK and Maven
    //    // maven 'Maven3'
       
    // }

    environment {
        APP_NAME = "ANGULAR EMS WEBAPP"
        RELEASE = "1.0.0"
        // DOCKER_USER = "bilal4178"
        // DOCKER_PASS = 'dockerhub'
        // IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        // IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
        // JENKINS_API_TOKEN =credentials("JENKINS_API_TOKEN")

    }

    stages {
        stage('Cleanup Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Git') {
            steps {
                git branch: 'main',
                    credentialsId: 'github',
                    url: 'https://github.com/murrehman/Angular-EMS-Webapp'
            }
        }

        stage('Build') {
            steps {
                sh 'cd frontend && npm install && npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'cd frontend && ng test --progress=false --watch false'
            }
        }
        
        // stage('SonarQube Analysis') {
        //     steps {
        //         script {
        //             withSonarQubeEnv(credentialsId: 'sonar') {
        //                 sh 'mvn sonar:sonar'
        //             }
        //         }
        //     }
        // }
        
        // stage("Build & Push Docker Image") {
        //     steps {
        //         script {
        //             docker.withRegistry('',DOCKER_PASS) {
        //                 docker_image = docker.build "${IMAGE_NAME}"
        //             }

        //             docker.withRegistry('',DOCKER_PASS) {
        //                 docker_image.push("${IMAGE_TAG}")
        //                 docker_image.push('latest')
        //             }
        //         }
        //     } 

        // }

        // stage("Trigger CD Pipeline") {
        //     steps {
        //         script {
        //             sh "curl -v -k --user admin:${JENKINS_API_TOKEN} -X POST -H 'cache-control: no-cache' -H 'content-type: application/x-www-form-urlencoded' --data 'IMAGE_TAG=${IMAGE_TAG}' 'http://34.16.175.97:8080/job/gitops-complete-pipeline/buildWithParameters?token=gitops-token'"
        //         }
        //     }

        // }

    }

    
    }