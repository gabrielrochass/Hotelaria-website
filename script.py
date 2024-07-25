import subprocess
import os

# Caminhos dos diretórios
backend_dir = os.path.join(os.getcwd(), 'backend')
frontend_dir = os.path.join(os.getcwd(), 'frontend')

# Comandos para abrir terminais e executar 'npm start'
backend_command = f'cd {backend_dir} && npm start'
frontend_command = f'cd {frontend_dir} && npm start'

# Executando os comandos em subprocessos separados
subprocess.Popen(backend_command, shell=True)
subprocess.Popen(frontend_command, shell=True)

print("\n\nBackend and Frontend are running...\n\n")
