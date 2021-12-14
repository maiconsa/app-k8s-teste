pipeline{
    agent any
    stages{
         stage('Initialize'){
        def dockerHome = tool 'myDocker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
    }
        stage('Get Source'){
            steps{
               git url : 'https://github.com/maiconsa/app-k8s-teste', branch : 'main'
            }
        }
        stage('Docker build '){
            steps{
                script{
                    dockerapp = docker.build("maiconsa/app-teste-maicon:${env.BUILD_ID}")
                }
            }
        }
        stage('Docker push Image'){
            steps{
                script{
                    docker.withRegistry('https://registry.hub.docker.com','dockerhub'){ 
                        dockerapp.push('latest')
                        dockerapp.push("${env.BUILD_ID}")
                        }

                }
            }
        }
    }

}