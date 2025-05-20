O formulário “Trocar de Contabilidade” segue layout de coluna única, com espaçamento vertical uniforme entre itens (\~16 px).

1. **Título**

   * Localização: topo, centralizado.
   * Estilo: fundo amarelo, texto em negrito “Inputs Para Formulário: Trocar de Contabilidade”.

2. **Campos de Input** (alinhados à esquerda num container com \~80% da largura da página):

   * **\*Nome:**

     * Label com asterisco vermelho, alinhado à margem esquerda.
     * Campo de texto à direita da label, largura ≈ 70% do container.
   * **\*Possui CNPJ: Sim / Não**

     * Label com asterisco vermelho, abaixo de Nome.
     * Dois radio buttons (“Sim” e “Não”) horizontalmente ao lado direito da label, cada um com seu texto e círculo de seleção.
   * **\*Informe CNPJ:**

     * Label com asterisco, abaixo de “Possui CNPJ”.
     * Campo de texto ao lado direito para 14 dígitos; exibido apenas se “Possui CNPJ” = “Sim”.
   * **\*Número WhatsApp:**

     * Label e campo de texto, mesma largura e alinhamento dos anteriores.
   * **\*Email:**

     * Label e campo de texto.
   * **\*Cidade:**

     * Label e campo de texto.
   * **\*Faturamento Médio Mensal:**

     * Label e campo de texto, para valores numéricos.
   * **\*Possui Funcionários Ativos: Sim / Não**

     * Label com radio buttons “Sim” e “Não” dispostos horizontalmente, abaixo de Faturamento.
   * **\*Quantos Funcionários Ativos:**

     * Label e campo numérico ao lado direito; exibido apenas se “Possui Funcionários Ativos” = “Sim”.

3. **Botão Enviar**

   * Cor verde, texto branco, bordas levemente arredondadas.
   * Posicionado 16 px abaixo do último campo, alinhado à margem esquerda do container, largura ≈ 15% do container.

4. **Seção Observações**

   * Título “Observações” centralizado, sobre fundo amarelo.
   * Três itens numerados, texto preto, recuo de 16 px e espaçamento vertical de 8 px:

     1. Todos os Inputs com Asteriscos devem ser obrigatórios o preenchimento
     2. No input “Possui CNPJ” se marcar “SIM” deverá abrir a caixa para digitar o número do CNPJ (14 Dígitos) e se marcar como “NÃO” não deverá abrir a caixa para digitar o CNPJ.
     3. No input “Possui Funcionários” se marcar “SIM” deverá abrir a caixa para digitar a quantidade de funcionários ativos, e se marcar como “NÃO” não deverá abrir a caixa para digitar a quantidade.

