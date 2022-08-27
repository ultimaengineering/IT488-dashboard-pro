pipeline {
  agent {
    kubernetes {
      yamlFile 'KubernetesBuilder.yaml'
    }
  }
  stages {
    stage('Build') {
      steps {
        checkout scm
        container('nodejs') {
          sh 'npm i --force && CI=false npm run build'
        }
      }
    }
    stage('Copy Artifacts') {
      steps {
        container('nodejs') {
          sh 'mkdir /workspace/opt/app/shared/build'
          sh 'cp -r build/* /workspace/opt/app/shared/build'
          sh 'cp Dockerfile /workspace/opt/app/shared/Dockerfile'
          sh 'cp nginx.conf /workspace/opt/app/shared/nginx.conf'
        }
      }
    }
    stage('Release') {
      steps {
        container('kaniko') {
          sh 'cp -r /workspace/opt/app/shared/build/*  /workspace'
          sh 'cp /workspace/opt/app/shared/Dockerfile /workspace'
          sh 'cp /workspace/opt/app/shared/nginx.conf /workspace'
          sh 'ls /workspace'
          sh 'ulimit -n 10000'
          sh '/kaniko/executor -f Dockerfile --destination=docker.ultimaengineering.io/488-dashboard:${BRANCH_NAME}-${BUILD_NUMBER}'
        }
      }
    }
  }
}