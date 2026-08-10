pipeline {
    agent any

    tools {
        // Automatically installs/provisions NodeJS configured in Jenkins Tools named 'node'
        // If your Jenkins uses docker agents or pre-installed node, you can remove/adjust this block.
        nodejs 'node'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing project dependencies...'
                // Detects OS and runs the appropriate script runner (bat on Windows, sh on Unix/Linux)
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                echo 'Running ESLint checks...'
                script {
                    if (isUnix()) {
                        sh 'npm run lint'
                    } else {
                        bat 'npm run lint'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                echo 'Building production assets...'
                script {
                    if (isUnix()) {
                        sh 'npm run build'
                    } else {
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo 'Archiving production build (dist folder)...'
                archiveArtifacts artifacts: 'dist/**', onlyIfSuccessful: true
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline execution succeeded!'
        }
        failure {
            echo 'Pipeline execution failed. Please check build logs.'
        }
    }
}
