pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test:unit' 
            }
        }
        stage('Triger Deploy pipeline'){
            steps {
                build 'ui-devops-deploy'
            }
        }
    }
}