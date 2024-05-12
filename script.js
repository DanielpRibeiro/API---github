// Função para buscar repositórios do GitHub
function buscarRepositorios() {
    // Obtém o nome de usuário digitado pelo usuário
    const username = document.getElementById('username').value;
    // Monta a URL da API do GitHub para buscar os repositórios do usuário
    const url = `https://api.github.com/users/${username}/repos`;

    // Faz uma solicitação para a API do GitHub usando a URL montada
    fetch(url)
        // Converte a resposta da API em formato JSON
        .then(response => response.json())
        // Manipula os dados JSON retornados pela API
        .then(data => {
            // Obtém o elemento HTML da lista de repositórios
            const repositoriosElemento = document.getElementById('repositorios');
            // Limpa a lista de repositórios antes de adicionar novos itens
            repositoriosElemento.innerHTML = '';

            // Classificar os repositórios por data de criação (mais recente primeiro)
            data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


            // Itera sobre os repositórios retornados pela API
            data.forEach(repo => {
                // Cria um novo item de lista (li) para cada repositório
                const li = document.createElement('li');
                // Cria um link para o repositório no GitHub
                const a = document.createElement('a');
                a.href = repo.html_url;
                a.textContent = repo.name;
                // Adiciona o link ao item de lista
                li.appendChild(a);
                // Adiciona o item de lista à lista de repositórios
                repositoriosElemento.appendChild(li);
            });
        })
        // Manipula erros em caso de falha na solicitação da API
        .catch(error => {
            console.error('Erro ao buscar repositórios:', error);
        });
}