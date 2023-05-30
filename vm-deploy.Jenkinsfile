node {
  def remote = [:]
  remote.name = 'sonbear'
  remote.host = '192.168.0.101'
  remote.user = 'sonbear'
  remote.password = 'password'
  remote.allowAnyHosts = true
  stage('Get changes') {
    sshCommand remote: remote, command: "git clone --branch develop https://github.com/Isaac2500/uiproyecto.git || true"
  }
  stage('Build project'){
    sshCommand remote: remote, command: "cd uiproyecto; git checkout develop; git pull origin develop; npm install; npm run build"
  }
  stage('Move build to var/www/html'){
    sshCommand remote: remote, command: "echo 'password' | sudo -S rm -rf /var/www/html/*"
    sshCommand remote: remote, command: "echo 'password' | sudo -S mv /home/sonbear/uiproyecto/dist/* /var/www/html"
  }
  stage('Restart Nginx'){
    sshCommand remote: remote, command: "echo 'password' | sudo -S systemctl reload nginx"
  } 
}