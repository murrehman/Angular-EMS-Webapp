pipeline {
    agent any

    
    // tools {
    //    // jdk 'Java17' // These are the names in Jenkins for JDK and Maven
    //    // maven 'Maven3'
       
    // }

    environment {
        APP_NAME = "angular-ems-webapp"
        RELEASE = "1.0.0"
        DOCKER_USER = "muteeurrehmanbajwa"
        DOCKER_PASS = 'dockerhub'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
        PATH = 'frontend/Dockerfile'
        //JENKINS_API_TOKEN =credentials("JENKINS_API_TOKEN")

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
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv(credentialsId: 'jenkins-sonarqube-token') {
                        sh ' cd frontend && npm run sonar'
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    waitForQualityGate abortPipeline: false, credentialsId: 'jenkins-sonarqube-token'
                }
            }
        }
        
        stage("Build & Push Docker Image") {
            steps {
                script {
                    docker.withRegistry('',DOCKER_PASS) {
                        docker_image = docker.build "${IMAGE_NAME}", -f "${PATH}" .
                    }

                    docker.withRegistry('',DOCKER_PASS) {
                        docker_image.push("${IMAGE_TAG}")
                        docker_image.push('latest')
                    }
                }
            } 

        }

        // stage("Trigger CD Pipeline") {
        //     steps {
        //         script {
        //             sh "curl -v -k --user admin:${JENKINS_API_TOKEN} -X POST -H 'cache-control: no-cache' -H 'content-type: application/x-www-form-urlencoded' --data 'IMAGE_TAG=${IMAGE_TAG}' 'http://34.16.175.97:8080/job/gitops-complete-pipeline/buildWithParameters?token=gitops-token'"
        //         }
        //     }

        // }

    }

    
    }