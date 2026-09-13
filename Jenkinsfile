pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('CI Success') {
            steps {
                echo 'CI pipeline completed successfully!'
            }
        }
    }
}
