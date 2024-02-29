pipeline {
    agent any

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
                // Activate Node.js version managed by nvm
                sh 'export NVM_DIR="/root/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 14.17.5'
                // Run npm install and npm run build
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}
