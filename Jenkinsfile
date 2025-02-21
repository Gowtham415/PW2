pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Checkout the code from your GitHub repository
                git url: 'https://github.com/Gowtham415/PW2.git', branch: 'main'
            }
        }

        stage('Build Image') {
            steps {
                script {
                    // Build the Docker image
                    sh "docker build -t playwright-docker ."
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run the Docker container and mount the reports directory
                    sh "docker run --rm -v \$(pwd)/test-reports:/app/test-reports playwright-docker"
                }
            }
        }

        stage('Archive Reports') {
            steps {
                // Archive test reports generated in the test-reports folder
                archiveArtifacts artifacts: 'test-reports/**/*', fingerprint: true
            }
        }
    }

    post {
        always {
            // Clean up Docker images after the build
            sh "docker rmi playwright-docker || true"
        }
    }
}
