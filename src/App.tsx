/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Server, 
  ShoppingCart, 
  Database, 
  Users, 
  Package, 
  CheckCircle, 
  Code,
  ShieldCheck,
  Zap,
  ArrowRight,
  Monitor,
  Activity,
  FileText,
  Truck,
  Layers,
  Settings,
  Archive,
  Cpu,
  HardDrive,
  Globe,
  Terminal,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Presentation Data refined by technical guide
const slides = [
  {
    id: 0,
    shortTitle: "Início",
    title: "Integração E-commerce × WinThor",
    subtitle: "Layout Padrão de Integração v1.1",
    tag: "CAPA",
    content: (
      <div className="flex flex-col items-center justify-center h-full space-y-8 text-center py-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-blue-600 rounded-3xl shadow-2xl shadow-blue-500/20"
        >
          <Zap className="w-16 h-16 text-white" />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 md:text-7xl uppercase italic">
            WinThor <span className="text-blue-600">Connect</span>
          </h1>
          <p className="max-w-2xl text-xl text-slate-500 font-medium italic">
            "Fornecer uma ferramenta única para integrar sites de E-commerce com o WinThor"
          </p>
        </div>
        <div className="flex gap-4 pt-12">
          <div className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-900 bg-slate-100 rounded-xl border border-slate-200">
            <Archive className="w-4 h-4 text-blue-600" /> Grupo PC Sistemas
          </div>
          <div className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-900 bg-slate-100 rounded-xl border border-slate-200">
            <Settings className="w-4 h-4 text-blue-600" /> Versão 1.1 - 2013
          </div>
        </div>
      </div>
    )
  },
  {
    id: 1,
    shortTitle: "Objetivos",
    title: "Objetivos e Premissas",
    subtitle: "A fundação técnica da integração",
    tag: "DIRETRIZES",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
          <h4 className="font-bold text-blue-600 uppercase text-xs tracking-widest">Missão do Projeto</h4>
          <p className="text-slate-700 text-sm leading-relaxed">
            Eliminar a necessidade de desenvolver integrações específicas para cada site, fornecendo um <strong>Layout Padrão Único</strong>.
          </p>
          <ul className="space-y-3 pt-4">
            <li className="flex gap-2 text-xs text-slate-600"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Intercâmbio via Web Service</li>
            <li className="flex gap-2 text-xs text-slate-600"><CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> Mesma estrutura para todas as integradoras</li>
          </ul>
        </div>
        <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-4 shadow-xl">
          <h4 className="font-bold text-blue-400 uppercase text-xs tracking-widest">Premissas Críticas</h4>
          <div className="space-y-3">
             <div className="p-3 bg-white/5 rounded-xl border border-white/10 italic text-[11px]">
               "Só serão aceitas informações externas se enviadas exatamente conforme solicitado."
             </div>
             <p className="text-xs text-slate-400">Alterações no layout ocorrem apenas para novas regras ou correções técnicas solicitadas pelo cliente.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    shortTitle: "Importação: Clientes (I)",
    title: "Importação: Pré-Cadastro",
    subtitle: "Identificação e dados básicos do cliente (4.1)",
    tag: "IMPORTAÇÃO",
    content: (
      <div className="h-full overflow-hidden flex flex-col">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex-1">
          <table className="w-full text-[11px] text-left">
            <thead className="bg-slate-900 text-white uppercase tracking-wider">
              <tr>
                <th className="p-3">Campo</th>
                <th className="p-3">Tipo/Tam</th>
                <th className="p-3">Descrição</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { n: "Código Cliente (E-com)", t: "Num (10)", d: "Código único no site" },
                { n: "E-mail", t: "Text (100)", d: "E-mail principal do cliente" },
                { n: "Nome / Fantasia", t: "Text (40)", d: "Dados cadastrais" },
                { n: "Tipo Pessoa", t: "Text (15)", d: "'Pessoa Física' ou 'Pessoa Jurídica'" },
                { n: "CPF/CNPJ", t: "Text (18)", d: "Somente números, sem máscara" },
                { n: "Data Nascimento", t: "Date", d: "Formato: 1900-01-31" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{row.n}</td>
                  <td className="p-3 font-mono text-blue-600">{row.t}</td>
                  <td className="p-3 text-slate-600">{row.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[10px] text-slate-400 italic">* Todos os telefones devem incluir DDD (Somente números)</p>
      </div>
    )
  },
  {
    id: 3,
    shortTitle: "Importação: Clientes (II)",
    title: "Importação: Localidade",
    subtitle: "Mapeamento de endereço e cobrança (4.1 Cont.)",
    tag: "IMPORTAÇÃO",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="bg-white p-6 border border-slate-200 rounded-3xl shadow-sm">
           <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Truck className="w-4 h-4 text-blue-600" /> Endereços</h4>
           <div className="space-y-2 text-[11px]">
              <div className="flex justify-between p-2 bg-slate-50 border-b"><span>Endereço/Número</span> <span className="font-mono">Text (40)/(6)</span></div>
              <div className="flex justify-between p-2 border-b"><span>Complemento</span> <span className="font-mono">Text (80)</span></div>
              <div className="flex justify-between p-2 bg-slate-50 border-b"><span>Bairro</span> <span className="font-mono">Text (40)</span></div>
              <div className="flex justify-between p-2 border-b"><span>CEP</span> <span className="font-mono">Text (9)</span></div>
              <div className="flex justify-between p-2 bg-slate-50"><span>Município/UF</span> <span className="font-mono">Text (15)/(2)</span></div>
           </div>
        </div>
        <div className="flex flex-col gap-4">
           <div className="bg-blue-600 p-6 rounded-3xl text-white">
              <h5 className="font-bold mb-2 text-sm uppercase">Regra 2831</h5>
              <p className="text-xs opacity-90 leading-relaxed font-medium">O endereço de cobrança é considerado obrigatoriamente o mesmo endereço de entrega para esta v1.1.</p>
           </div>
           <div className="bg-slate-100 p-6 rounded-3xl border border-slate-200">
              <h5 className="font-bold mb-2 text-sm text-slate-900">Documentação</h5>
              <p className="text-xs text-slate-600 italic">RG e Órgão Emissor são campos necessários para segurança e validação fiscal.</p>
           </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    shortTitle: "Regras: Clientes",
    title: "Observações do Pré-Cadastro",
    subtitle: "Processamento e parâmetros WinThor (4.1)",
    tag: "REGRAS",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
         {[
           { title: "Status Inicial", icon: <ShieldCheck />, desc: "Cliente é importado sempre com status 'Bloqueado'." },
           { title: "RCA E-com", icon: <Users />, desc: "Código definido no Parâmetro 2836 (USUARIOECOMMERCE) da rotina 132." },
           { title: "Fiscal (IE)", icon: <FileText />, desc: "Inscrição Estadual é inserida como 'ISENTO' se vier em branco." },
           { title: "Planos", icon: <Settings />, desc: "Plano de pagamento conforme parâmetro 1078 da rotina 132." },
           { title: "Limites", icon: <Database />, desc: "Limite de Crédito conforme parâmetro 1276 da rotina 132." },
           { title: "Cobrança", icon: <CheckCircle />, desc: "Automático: Pessoa Jurídica (1254) vs Pessoa Física (2444)." }
         ].map((card, i) => (
           <div key={i} className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col gap-3 shadow-sm">
             <div className="text-blue-600 font-bold">{card.icon}</div>
             <h5 className="font-bold text-slate-900 text-xs">{card.title}</h5>
             <p className="text-[11px] text-slate-500 leading-tight">{card.desc}</p>
           </div>
         ))}
      </div>
    )
  },
  {
    id: 5,
    shortTitle: "Pedido: Cabeçalho",
    title: "Pedido - Cabeçalho",
    subtitle: "Dados fundamentais da venda (4.2)",
    tag: "IMPORTAÇÃO",
    content: (
      <div className="space-y-4 h-full overflow-hidden flex flex-col">
        <div className="bg-slate-900 text-white p-4 rounded-xl flex justify-between items-center shrink-0">
          <span className="text-xs font-mono uppercase text-blue-400">Método: InserirCabecalhoPedido</span>
          <span className="text-[10px] bg-white/10 px-2 py-1 rounded">Tabela: PCPEDCTEMP</span>
        </div>
        <div className="flex-1 overflow-auto bg-white border border-slate-200 rounded-2xl">
          <table className="w-full text-[10px] text-left">
            <thead className="bg-slate-100 sticky top-0">
              <tr>
                <th className="p-3">Campo</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Descrição / Parâmetro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { n: "Número Pedido E-com", t: "Num (15)", d: "Numero_Pedido_Ecommerce" },
                { n: "Código Filial", t: "Text (2)", d: "Codigo_Filial (WinThor)" },
                { n: "Código Cliente", t: "Num (6)", d: "Codigo_Cliente (WinThor)" },
                { n: "Valor Frete", t: "Num (16,3)", d: "Valor_Frete" },
                { n: "Cupom/Desconto", t: "Num (10)/(16,3)", d: "Descontos aplicados no carrinho" },
                { n: "TEF / Autorização", t: "Varios", d: "ID Transação e Código Autorização" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                   <td className="p-3 font-bold">{row.n}</td>
                   <td className="p-3 text-blue-600 font-mono">{row.t}</td>
                   <td className="p-3 italic text-slate-500">{row.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    id: 6,
    shortTitle: "Pedido: Itens",
    title: "Pedido - Itens",
    subtitle: "Composição do carrinho (4.3)",
    tag: "IMPORTAÇÃO",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
         <div className="space-y-6">
            <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xl">
               <h4 className="font-bold text-slate-900 mb-4">Estrutura de Itens</h4>
               <ul className="space-y-3 text-[11px] text-slate-600">
                  <li className="flex justify-between border-b pb-2"><span>Num. Pedido E-com</span> <span className="font-bold">Obrigatório</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Cód. Produto (WinThor)</span> <span className="font-bold">Num (6)</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Quantidade</span> <span className="font-bold">Num (20,6)</span></li>
                  <li className="flex justify-between border-b pb-2"><span>Preço de Venda</span> <span className="font-bold">Num (18,6)</span></li>
                  <li className="flex justify-between"><span>Sequência do Item</span> <span className="font-bold">Num (20)</span></li>
               </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl text-[10px] text-blue-800 italic border border-blue-100">
              * O WinThor insere estes dados na tabela <strong>PCPEDITEMP</strong> com tipo de integração "W".
            </div>
         </div>
         <div className="bg-slate-900 rounded-3xl p-10 text-white flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl"><Package className="w-10 h-10" /></div>
            <div>
               <h5 className="text-xl font-bold italic underline decoration-blue-500">Atenção ao Usuário</h5>
               <p className="text-slate-400 text-xs mt-2 italic leading-relaxed">
                 O usuário gravador do item é extraído automaticamente do parâmetro 2836 (USUARIOECOMMERCE) da rotina 132.
               </p>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 7,
    shortTitle: "Confirmação",
    title: "A Confirmação do Pedido",
    subtitle: "Conversão de Temporário para Efetivo (4.4)",
    tag: "CRÍTICO",
    content: (
      <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto space-y-8">
         <div className="w-full p-8 bg-amber-50 border-2 border-amber-200 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Monitor className="w-20 h-20 text-amber-500" /></div>
            <h4 className="text-xl font-black text-amber-900 uppercase italic mb-4">Método: ConfirmarPedido</h4>
            <p className="text-slate-700 leading-relaxed text-sm mb-6 font-medium">
               Após incluir cabeçalho e itens, este método DEVE ser chamado. É este gatilho que transforma o pedido temporário (W) em um pedido real pronto para faturamento.
            </p>
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-amber-200 shadow-sm">
               <div className="p-2 bg-amber-200 rounded-lg text-amber-900 font-bold text-xs">AÇÃO</div>
               <span className="text-xs font-mono text-slate-600">Numero_Pedido_ECommerce (Num 15)</span>
            </div>
         </div>
         <div className="flex items-center gap-6 w-full px-4">
            <div className="flex-1 h-0.5 bg-slate-200"></div>
            <CheckCircle className="text-green-500" />
            <div className="flex-1 h-0.5 bg-slate-200"></div>
         </div>
         <p className="text-xs text-center text-slate-500 italic uppercase tracking-widest font-bold">Início do Ciclo de Faturamento</p>
      </div>
    )
  },
  {
    id: 8,
    shortTitle: "Retorno Vendas",
    title: "Pesquisa de Retorno",
    subtitle: "Saber se a importação teve sucesso (4.5)",
    tag: "LOGS",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
         <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-900 border-l-4 border-blue-600 pl-4 tracking-tight">Campos Gerados no Retorno</h4>
            <div className="space-y-2">
               {['importado', 'tipo_retorno', 'codigo_retorno', 'mensagem'].map(tag => (
                 <div key={tag} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl group hover:border-blue-200 transition-all">
                    <Code className="w-3 h-3 text-blue-400" />
                    <span className="font-mono text-xs font-bold text-slate-700">{tag}</span>
                 </div>
               ))}
            </div>
         </div>
         <div className="p-8 bg-blue-600 rounded-3xl text-white shadow-2xl relative">
            <h5 className="font-bold text-sm mb-4">Tratativa de Erros</h5>
            <p className="text-xs leading-relaxed opacity-90 italic">
               Caso o pedido ou item não seja aceito, o sistema retorna detalhadamente o código do motivo e a mensagem para que o e-commerce possa tratar a falha no frontend ou notificar o admin.
            </p>
         </div>
      </div>
    )
  },
  {
    id: 9,
    shortTitle: "Cancelamento",
    title: "Cancelamento de Pedidos",
    subtitle: "Métodos 4.6 e 4.7",
    tag: "OPERAÇÕES",
    content: (
      <div className="space-y-6 h-full">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-red-50 border border-red-100 rounded-3xl">
               <h5 className="text-red-900 font-bold flex items-center gap-2 mb-4"><Zap className="w-4 h-4" /> Método: CancelarPedido</h5>
               <ul className="text-xs text-red-800 space-y-2 font-medium">
                  <li>- Numero_Pedido_WinThor (ID Interno)</li>
                  <li>- Numero_Pedido_Ecommerce (ID Origem)</li>
                  <li>- Motivo_Cancelamento (Texto 60)</li>
               </ul>
            </div>
            <div className="p-6 bg-slate-100 border border-slate-200 rounded-3xl">
               <h5 className="text-slate-900 font-bold mb-4 italic">Pesquisar Retorno Motivo</h5>
               <p className="text-xs text-slate-600 italic">Verifica se o WinThor efetivou o cancelamento e traz a <strong>data_cancelamento</strong>.</p>
            </div>
         </div>
         <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl flex flex-col justify-center items-center text-center h-48">
            <ShieldCheck className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-xs text-slate-400 italic">O cancelamento exige que o pedido ainda não tenha sido faturado em alguns modelos de automação.</p>
         </div>
      </div>
    )
  },
  {
    id: 10,
    shortTitle: "Logística",
    title: "Retorno e Documentos",
    subtitle: "Postagem e XML (4.8 e 4.9)",
    tag: "TRACKING",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
         <div className="space-y-4">
            <div className="bg-white p-6 border border-slate-200 rounded-3xl flex gap-4 shadow-sm">
               <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0"><Truck /></div>
               <div>
                  <h5 className="font-bold text-slate-900 text-sm">Retorno Postagem</h5>
                  <p className="text-xs text-slate-500 mt-1">Recupera o código de rastreio processado pelo ERP para sincronizar com o cliente.</p>
               </div>
            </div>
            <div className="bg-white p-6 border border-slate-200 rounded-3xl flex gap-4 shadow-sm">
               <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shrink-0"><FileText /></div>
               <div>
                  <h5 className="font-bold text-slate-900 text-sm">Pesquisar Doc Eletrônico</h5>
                  <p className="text-xs text-slate-500 mt-1">Exporta o XML da NF-e, número da nota e série assim que faturado.</p>
               </div>
            </div>
         </div>
         <div className="bg-slate-900 p-8 rounded-2xl text-slate-300 space-y-4 shadow-2xl">
            <h5 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em]">Data Feed Pós-Venda</h5>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
               <div className="flex justify-between border-b border-white/10 pb-2 text-xs"><span>numero_nota</span> <span className="text-blue-300">Inteiro</span></div>
               <div className="flex justify-between border-b border-white/10 pb-2 text-xs"><span>serie</span> <span className="text-blue-300">String</span></div>
               <div className="flex justify-between text-xs"><span>xml_nfe</span> <span className="text-blue-300">TEXT (Large)</span></div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 11,
    shortTitle: "Exportação: Filial",
    title: "Exportação: Dados da Filial",
    subtitle: "Identificação do hub de expedição (5.1)",
    tag: "EXPORTAÇÃO",
    content: (
      <div className="space-y-6 h-full">
         <div className="p-8 bg-blue-600 rounded-3xl text-white">
            <h4 className="text-2xl font-black italic mb-2 uppercase">Filiais E-commerce</h4>
            <p className="text-sm opacity-80 font-medium">Somente são retornadas as filiais marcadas com <strong>SIM</strong> no parâmetro <strong>2831</strong> (WinThor R132).</p>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['codigo', 'razao_social', 'fantasia', 'cgc', 'endereco', 'cidade', 'uf', 'cep'].map(field => (
              <div key={field} className="p-4 bg-white border border-slate-200 rounded-xl text-center">
                 <div className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-tight">{field}</div>
              </div>
            ))}
         </div>
      </div>
    )
  },
  {
    id: 12,
    shortTitle: "Exportação: Produtos (I)",
    title: "Exportação: Catálogo",
    subtitle: "Mapeamento base do produto (5.2)",
    tag: "EXPORTAÇÃO",
    content: (
      <div className="space-y-4 h-full overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto bg-white border border-slate-200 rounded-2xl shadow-inner px-2">
          <table className="w-full text-[10px] text-left">
            <thead className="bg-slate-50 sticky top-0 text-slate-400 font-bold uppercase border-b shadow-sm">
              <tr>
                <th className="p-3">Atributo</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Finalidade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { a: "Dept / Seção", t: "Num (6)", f: "Filtros de navegação" },
                { a: "Categoria / Sub", t: "Num (6)", f: "SEO e Taxonomia" },
                { a: "Código Barra 1/2", t: "Num (20)", f: "GTIN (8, 12, 13, 14)" },
                { a: "Descrição / Unit.", t: "Varios", f: "Nome técnico e Unidade (CX/UN)" },
                { a: "Peso Bruto/Líq", t: "Num (12,6)", f: "Cálculo de Frete Logístico" },
                { a: "Status (Ativo)", t: "Boolean", f: "Disponibilizar no site" }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-blue-50/30">
                  <td className="p-3 font-black text-slate-900">{row.a}</td>
                  <td className="p-3 font-mono text-blue-600">{row.t}</td>
                  <td className="p-3 italic text-slate-500">{row.f}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    id: 13,
    shortTitle: "Exportação: Produtos (II)",
    title: "Atributos de E-commerce",
    subtitle: "Campos específicos do site (5.2 Cont.)",
    tag: "EXPORTAÇÃO",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-stretch">
         <div className="p-6 bg-slate-100 border border-slate-200 rounded-3xl flex flex-col justify-center">
            <h5 className="font-bold text-slate-900 mb-4 flex items-center gap-2 underline decoration-blue-600 decoration-2">Rich Content Fields</h5>
            <ul className="space-y-4">
               <li className="text-xs bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                  <span className="block font-black text-blue-600 mb-1 tracking-tighter">nome_ecommerce (Text 200)</span>
                  <p className="text-slate-500">Nome amigável para exibição em vitrines.</p>
               </li>
               <li className="text-xs bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                  <span className="block font-black text-blue-600 mb-1 tracking-tighter">subtitulo_ecommerce (Text 200)</span>
                  <p className="text-slate-500">Características técnicas resumidas.</p>
               </li>
            </ul>
         </div>
         <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
            <h5 className="font-bold mb-4 opacity-50 flex items-center gap-2"><Layers className="w-4 h-4" /> Informações Técnicas</h5>
            <div className="space-y-3 font-mono text-[10px]">
               <div className="p-3 bg-white/5 rounded-lg border border-white/10">informacoes_tecnicas (500 chars)</div>
               <div className="p-3 bg-white/5 rounded-lg border border-white/10">dados_tecnicos (1000 chars)</div>
               <div className="p-3 bg-white/5 rounded-lg border border-white/10">observacao_ecommerce (500 chars)</div>
            </div>
            <div className="mt-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-[11px] italic">
              Estes campos permitem uma descrição detalhada sem depender da descrição curta do ERP.
            </div>
         </div>
      </div>
    )
  },
  {
    id: 14,
    shortTitle: "Hierarquia",
    title: "Taxonomia do Catálogo",
    subtitle: "Categorias, Seções e Departamentos (5.3 a 5.6)",
    tag: "ESTRUTURA",
    content: (
      <div className="h-full flex flex-col items-center justify-center space-y-10">
         <div className="flex gap-4 w-full max-w-3xl items-center">
            <div className="flex-1 p-6 bg-slate-900 text-white rounded-3xl text-center shadow-xl border-b-4 border-blue-600">
               <h6 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">CÉU</h6>
               <span className="font-black text-xl italic uppercase">Departamento</span>
            </div>
            <ArrowRight className="text-slate-400" />
            <div className="flex-1 p-6 bg-white border border-slate-200 rounded-3xl text-center shadow-lg">
               <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">NÍVEL 2</h6>
               <span className="font-black text-xl text-slate-900 italic uppercase">Seção</span>
            </div>
            <ArrowRight className="text-slate-400" />
            <div className="flex-1 p-6 bg-slate-50 border border-slate-200 rounded-3xl text-center italic shadow-inner">
               <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">NÍVEL 3</h6>
               <span className="font-black text-xl text-slate-600 uppercase">Categoria</span>
            </div>
         </div>
         <p className="text-sm text-slate-500 font-medium max-w-xl text-center leading-relaxed">
            A integração exporta os códigos e descrições (Varchar2 até 40) para reconstruir exatamente a árvore mercadológica do WinThor no ambiente Web.
         </p>
      </div>
    )
  },
  {
    id: 15,
    shortTitle: "Marcas",
    title: "Marcas dos Produtos",
    subtitle: "Identidade do fabricante (5.7)",
    tag: "EXPORTAÇÃO",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
         <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/5 rounded-full"></div>
            <h4 className="text-xl font-bold text-slate-900 mb-6 font-mono">Mapeamento Métodos</h4>
            <div className="space-y-4 text-xs">
               <div className="flex justify-between border-b pb-2"><span>codigo_marca</span> <span className="font-mono text-blue-600 uppercase">Num (8)</span></div>
               <div className="flex justify-between border-b pb-2"><span>marca</span> <span className="font-mono text-blue-600 uppercase">Text (40)</span></div>
               <div className="flex justify-between"><span>ativo</span> <span className="font-mono text-blue-600 uppercase">Status A/I</span></div>
            </div>
         </div>
         <div className="space-y-6">
            <div className="p-6 bg-slate-900 rounded-3xl text-white shadow-2xl">
               <h5 className="font-bold text-sm mb-2 text-blue-400">Filtragem Dinâmica</h5>
               <p className="text-xs opacity-80 italic leading-relaxed">
                  Permite gerar listagens por marca e landing pages específicas de marcas parceiras utilizando os dados mestres do ERP.
               </p>
            </div>
            <div className="p-6 bg-slate-100 border border-slate-200 rounded-3xl">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Sync Rule</span>
               <p className="text-xs text-slate-700 italic">Sempre verificar o campo Ativo para não exibir marcas sem showroom.</p>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 16,
    shortTitle: "Estoque",
    title: "Gestão de Estoque",
    subtitle: "Disponibilidade em tempo real (5.8)",
    tag: "SINCRONISMO",
    content: (
      <div className="h-full flex flex-col justify-center items-center">
         <div className="bg-white p-12 border border-slate-200 rounded-3xl shadow-2xl text-center max-w-xl space-y-6">
            <div className="text-blue-600 flex justify-center"><Activity className="w-16 h-16 animate-pulse" /></div>
            <h4 className="text-3xl font-black italic tracking-tighter text-slate-900 uppercase">quantidade_disponivel</h4>
            <p className="text-sm text-slate-500 font-medium">
               O método <strong>PC_Estoque</strong> retorna o saldo real que o WinThor considera "disponível para venda", já subtraindo as reservas.
            </p>
            <div className="flex gap-4 justify-center">
               <div className="px-5 py-2 bg-slate-900 text-white rounded-xl font-mono text-xs">codigo_filial</div>
               <div className="px-5 py-2 bg-slate-900 text-white rounded-xl font-mono text-xs">codigo_produto</div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 17,
    shortTitle: "Preços",
    title: "Política de Preços",
    subtitle: "Precificação dinâmica por Região (5.10)",
    tag: "EXPORTAÇÃO",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
         <div className="bg-amber-600 p-8 rounded-3xl text-white shadow-2xl space-y-6">
            <h4 className="text-2xl font-black italic uppercase">PC_Preco</h4>
            <p className="text-sm leading-relaxed font-medium">
               A v1.1 utiliza o parâmetro <strong>2832 (REGIAOECOMMERCE)</strong> da rotina 132 para buscar o <strong>pvenda1</strong>.
            </p>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 italic text-xs text-center">
              "O preço do produto depende exclusivamente deste parâmetro de região configurado na presidência."
            </div>
         </div>
         <div className="space-y-6 text-sm text-slate-600">
            <div className="flex gap-4 items-center">
               <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-lg border border-slate-200"><CheckCircle className="text-green-500" /></div>
               <span>Mapeamento exato de centavos (Num 18,6).</span>
            </div>
            <div className="flex gap-4 items-center">
               <div className="w-10 h-10 bg-slate-100 flex items-center justify-center rounded-lg border border-slate-200"><CheckCircle className="text-green-500" /></div>
               <span>Atualização por código de produto (codigo_produto).</span>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 18,
    shortTitle: "Exportação: Clientes",
    title: "Leitura de Clientes",
    subtitle: "Sincronização de base legada (5.9)",
    tag: "EXPORTAÇÃO",
    content: (
      <div className="h-full space-y-4">
         <p className="text-xs text-slate-500 font-bold uppercase tracking-widest italic">Campos de retorno para atualização de perfil no site:</p>
         <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
           <div className="grid grid-cols-3 bg-slate-900 text-white p-3 text-[10px] font-black uppercase italic">
              <span>Campo ERP</span>
              <span>Descrição</span>
              <span>Tipo</span>
           </div>
           <div className="max-h-64 overflow-y-auto divide-y text-[10px]">
              {[
                { c: "codigo_cliente_winthor", d: "ID Interno ERP", t: "Num (6)" },
                { c: "bloqueado", d: "Status de Crédito", t: "Text (1)" },
                { c: "codigo_municipio_ibge", d: "ID Fiscal IBGE", t: "Num (10)" },
                { c: "excluido", d: "Status de Ativação", t: "Boolean" },
                { c: "data_exclusao", d: "Data Sincronização", t: "Date (8)" }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 p-3 hover:bg-blue-50">
                   <span className="font-bold text-blue-600 font-mono">{row.c}</span>
                   <span className="text-slate-600">{row.d}</span>
                   <span className="text-slate-400">{row.t}</span>
                </div>
              ))}
           </div>
         </div>
      </div>
    )
  },
  {
    id: 19,
    shortTitle: "Histórico",
    title: "Manutenções e Log",
    subtitle: "Histórico de Alterações Técnica",
    tag: "VERSÃO",
    content: (
      <div className="h-full flex flex-col justify-center max-w-2xl mx-auto space-y-8">
         <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl relative">
            <h4 className="text-slate-900 font-black italic mb-6 uppercase tracking-tighter">Versão 1.1 - Setembro/2013</h4>
            <div className="space-y-4">
               <div className="flex gap-4">
                  <div className="text-xs font-bold text-blue-600 font-mono shrink-0">DE:</div>
                  <div className="text-xs text-slate-600">Hugo Filipe Duarte da Silva (Development)</div>
               </div>
               <div className="flex gap-4">
                  <div className="text-xs font-bold text-blue-600 font-mono shrink-0">AD:</div>
                  <div className="text-xs text-slate-600">Lilian de Paula Paiva Silveira (Analysis)</div>
               </div>
               <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl text-xs italic text-slate-500">
                  "Ajustes de informações no layout original para maior compatibilidade com novas rotinas."
               </div>
            </div>
         </div>
      </div>
    )
  },
  {
    id: 20,
    shortTitle: "Arquitetura 2026",
    title: "Modern Backend Stack",
    subtitle: "A camada de inteligência (Middleware)",
    tag: "ARQUITETURA",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
         <div className="space-y-6">
            <h4 className="text-2xl font-black italic text-slate-900 uppercase">Resiliência Total</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
               Para sistemas modernos, não conectamos o site diretamente ao SOAP. Utilizamos um <strong>Middleware em NestJS</strong> com banco de dados local (Prisma) e filas (BullMQ).
            </p>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black italic">NESTJS</span>
               <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black italic">REDIS</span>
               <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black italic">POSTGRES</span>
            </div>
         </div>
         <div className="p-8 bg-slate-900 rounded-3xl shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-blue-400 font-mono text-[10px] uppercase"><CheckCircle className="w-3 h-3" /> Camada de Adapter (SOAP)</div>
            <div className="flex items-center gap-3 text-blue-400 font-mono text-[10px] uppercase"><CheckCircle className="w-3 h-3" /> Camada de Service (Regras)</div>
            <div className="flex items-center gap-3 text-blue-400 font-mono text-[10px] uppercase"><CheckCircle className="w-3 h-3" /> Camada de Cache (Performance)</div>
         </div>
      </div>
    )
  },
  {
    id: 21,
    shortTitle: "NestJS Adapter",
    title: "O Adaptador SOAP",
    subtitle: "Isolando a complexidade do WinThor",
    tag: "DESENVOLVIMENTO",
    content: (
      <div className="space-y-6 h-full">
         <div className="p-6 bg-white border-2 border-slate-100 rounded-3xl shadow-lg">
            <h4 className="font-bold text-slate-900 mb-4 italic">Regra de Ouro: Nunca exponha o SOAP ao Controller</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
               O <strong>WinThorAdapter</strong> encapsula as chamadas XML. Se o layout mudar (como da v1.0 para v1.1), você altera apenas uma classe, sem quebrar o site.
            </p>
            <div className="p-4 bg-slate-900 rounded-xl font-mono text-[10px] text-blue-300">
               async createOrder(header, items) &#123; <br />
               &nbsp;&nbsp;await this.winthor.post('InserirCabecalhoPedido', header); <br />
               &nbsp;&nbsp;... <br />
               &#125;
            </div>
         </div>
      </div>
    )
  },
  {
    id: 22,
    shortTitle: "Persistência Prisma",
    title: "Banco de Dados Local",
    subtitle: "Prisma como motor de sincronização",
    tag: "DADOS",
    content: (
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
             <h5 className="font-bold text-slate-900 uppercase text-xs tracking-widest">Modelagem Relacional</h5>
             <ul className="text-xs space-y-2 text-slate-600 italic">
                <li>- Product (Estoque e Preço em cache)</li>
                <li>- Customer (Sync bi-direcional)</li>
                <li>- Order / OrderItem</li>
             </ul>
          </div>
          <div className="flex flex-col gap-4">
             <div className="p-5 bg-blue-600 text-white rounded-3xl shadow-xl">
                <h5 className="font-bold text-sm">Performance</h5>
                <p className="text-[10px] opacity-90">Leia o catálogo do banco local (milissegundos) em vez de fazer centenas de chamadas SOAP ao WinThor.</p>
             </div>
          </div>
       </div>
    )
  },
  {
    id: 23,
    shortTitle: "Resiliência BullMQ",
    title: "Processamento Assíncrono",
    subtitle: "Garantindo a entrega do pedido com BullMQ",
    tag: "INFRAESTRUTURA",
    content: (
       <div className="h-full flex flex-col justify-center items-center space-y-8">
          <div className="p-8 bg-slate-900 rounded-full shadow-2xl relative">
             <Layers className="w-16 h-16 text-blue-400 animate-pulse" />
          </div>
          <div className="max-w-xl text-center space-y-4">
             <h4 className="text-xl font-black italic uppercase text-slate-900">Fila de Pedidos (Priority Queue)</h4>
             <p className="text-xs text-slate-500 font-medium">
                Se o servidor do WinThor ficar offline, o pedido é armazenado no <strong>Redis</strong> via BullMQ e tentado novamente automaticamente (Exponential Backoff).
             </p>
          </div>
       </div>
    )
  },
  {
    id: 24,
    shortTitle: "Cron Jobs",
    title: "Sincronização Ativa",
    subtitle: "Diferencial Competitivo: Dados Quentes",
    tag: "ESTRATÉGIA",
    content: (
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          <div className="p-6 bg-white border border-slate-200 rounded-3xl flex flex-col items-center text-center">
             <Activity className="w-8 h-8 text-blue-600 mb-4" />
             <h5 className="font-bold text-xs uppercase mb-2">Sync: 5 min</h5>
             <p className="text-[10px] text-slate-500 italic">Atualização de estoque e preços para evitar venda de produtos sem saldo.</p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-3xl flex flex-col items-center text-center">
             <Package className="w-8 h-8 text-blue-600 mb-4" />
             <h5 className="font-bold text-xs uppercase mb-2">Sync: 1 hora</h5>
             <p className="text-[10px] text-slate-500 italic">Novos produtos, categorias e descrições técnicas.</p>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-3xl flex flex-col items-center text-center">
             <Users className="w-8 h-8 text-blue-600 mb-4" />
             <h5 className="font-bold text-xs uppercase mb-2">Sync: Real-time</h5>
             <p className="text-[10px] text-slate-500 italic">Pré-cadastro de clientes e acompanhamento de status (Tracking).</p>
          </div>
       </div>
    )
  },
  {
    id: 25,
    shortTitle: "Fault Tolerance",
    title: "Tolerância a Falhas",
    subtitle: "Circuit Breaker e Idempotência",
    tag: "SEGURANÇA",
    content: (
       <div className="space-y-6 h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-6 bg-red-900 text-white rounded-3xl shadow-xl">
                <h5 className="font-bold text-sm flex items-center gap-2 mb-2"><ShieldCheck className="w-4 h-4" /> Circuit Breaker</h5>
                <p className="text-[10px] opacity-80 italic">Se o WinThor falhar 5 vezes seguidas, o sistema entra em modo de segurança e enfileira tudo para evitar timeouts no site.</p>
             </div>
             <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
                <h5 className="font-bold text-sm flex items-center gap-2 mb-2"><Settings className="w-4 h-4" /> Idempotência</h5>
                <p className="text-[10px] opacity-80 italic">Uso de chaves únicas por pedido no Redis para garantir que um pedido não seja duplicado no ERP em caso de retentativa.</p>
             </div>
          </div>
       </div>
    )
  },
  {
    id: 26,
    shortTitle: "Monitoramento",
    title: "Observabilidade",
    subtitle: "Saiba o que acontece antes do cliente reclamar",
    tag: "OPERAÇÕES",
    content: (
       <div className="h-full flex flex-col justify-center items-stretch space-y-4">
          <div className="bg-slate-50 p-6 border border-slate-200 rounded-3xl flex justify-between items-center">
             <div className="flex gap-4 items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-blink"></div>
                <span className="text-xs font-bold text-slate-700 font-mono uppercase tracking-widest">SOAP API HEALTH: 100%</span>
             </div>
             <div className="text-[10px] font-bold text-slate-400 italic">Latência Média: 142ms</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-6 bg-white border border-slate-200 rounded-3xl text-center">
                <div className="text-xl font-bold text-slate-900">4,200</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Pedidos Sincronizados</div>
             </div>
             <div className="p-6 bg-white border border-slate-200 rounded-3xl text-center">
                <div className="text-xl font-bold text-blue-600">0</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Erros na Fila</div>
             </div>
          </div>
       </div>
    )
  },
  {
    id: 27,
    shortTitle: "Segurança de Dados",
    title: "DPI & Proteção",
    subtitle: "Tratamento de PII e Identidade",
    tag: "COMPLIANCE",
    content: (
       <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
          <div className="space-y-6">
             <h4 className="text-lg font-bold text-slate-900 border-l-4 border-blue-600 pl-4 tracking-tight uppercase italic">Privacidade Primeiro</h4>
             <p className="text-xs text-slate-500 italic font-medium leading-relaxed">
                Dados Pessoais Identificáveis (PII) como CPF, E-mail e Endereço são criptografados no banco Postgres local e transmitidos via TLS 1.2+ para o WinThor.
             </p>
          </div>
          <div className="bg-slate-100 p-8 rounded-3xl border border-slate-200 flex flex-col justify-center items-center text-center">
             <ShieldCheck className="w-12 h-12 text-blue-600 mb-4" />
             <p className="text-[10px] text-slate-400 italic font-bold uppercase tracking-widest">LGPD Compliance Module</p>
          </div>
       </div>
    )
  },
  {
    id: 28,
    shortTitle: "Escalabilidade",
    title: "Pronto para Escalar",
    subtitle: "Horizontal Scaling & Clusters",
    tag: "CRESCIMENTO",
    content: (
       <div className="h-full flex flex-col justify-center items-center text-center space-y-6">
          <div className="flex gap-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="w-16 h-20 bg-slate-200 rounded-xl border-t-4 border-blue-600 flex items-center justify-center font-mono font-bold text-slate-400">Node {i}</div>
             ))}
          </div>
          <h4 className="text-xl font-black italic text-slate-900 uppercase">Processamento em Cluster</h4>
          <p className="text-xs text-slate-500 font-medium max-w-sm">
             A arquitetura NestJS permite rodar múltiplos workers em paralelo para processar milhares de pedidos simultâneos sem gargalos.
          </p>
       </div>
    )
  },
  {
    id: 29,
    shortTitle: "Stack Resumo",
    title: "Resumo da Stack Técnica",
    subtitle: "A fundação do sucesso",
    tag: "TECH STACK",
    content: (
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
          {[
            { l: "Framework", v: "NestJS 10+" },
            { l: "Database", v: "PostgreSQL / Prisma" },
            { l: "Queue", v: "BullMQ / Redis" },
            { l: "Auth", v: "JWT Stateless" },
            { l: "Interface", v: "SOAP (v1.1)" },
            { l: "Cloud", v: "Docker / AWS" },
            { l: "Docs", v: "Swagger / OpenAPI" },
            { l: "Logging", v: "Winston / ELK" }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-slate-900 rounded-2xl flex flex-col justify-center items-center text-center border-b-2 border-blue-500">
               <div className="text-[8px] text-blue-400 uppercase font-black mb-1">{item.l}</div>
               <div className="text-[10px] text-white font-bold">{item.v}</div>
            </div>
          ))}
       </div>
    )
  },
  {
    id: 30,
    shortTitle: "Conclusão",
    title: "Resumo Estratégico",
    subtitle: "O ecossistema em harmonia",
    tag: "FINAL",
    content: (
      <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
         <div className="p-4 bg-blue-600 rounded-full shadow-2xl shadow-blue-500/40"><Settings className="w-12 h-12 text-white animate-spin-slow" /></div>
         <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter">INTEGRAÇÃO <span className="text-blue-600 underline">PRONTA PARA 2026</span></h3>
         <p className="text-slate-500 max-w-lg font-medium leading-relaxed">
            Unimos o layout clássico do WinThor v1.1 com uma arquitetura moderna, escalável e resiliente em NestJS. Agora a base técnica está sólida para sustentar qualquer operação de E-commerce.
         </p>
         <div className="flex gap-4">
            <div className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase text-xs tracking-widest shadow-xl">Documentação Técnica Finalizada</div>
         </div>
      </div>
    )
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState<'docs' | 'infra'>('docs');
  const [telemetry, setTelemetry] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    cpu: 42,
    ram: 68,
    latency: 142,
    ocrAccuracy: 98.4,
    queueDepth: 12
  });

  // Simulation Engine
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() * 10 - 5))),
        ram: Math.min(100, Math.max(0, prev.ram + (Math.random() * 4 - 2))),
        latency: Math.min(500, Math.max(50, prev.latency + (Math.random() * 20 - 10))),
        ocrAccuracy: Math.min(100, Math.max(90, prev.ocrAccuracy + (Math.random() * 0.2 - 0.1))),
        queueDepth: Math.max(0, Math.floor(prev.queueDepth + (Math.random() * 6 - 3)))
      }));

      setTelemetry(prev => {
        const newData = [...prev, { time: new Date().toLocaleTimeString(), val: Math.floor(Math.random() * 100) }];
        if (newData.length > 20) return newData.slice(1);
        return newData;
      });

      if (Math.random() > 0.8) {
        const events = [
          "OCR Processed: Invoice #9928",
          "WinThor Sync: Product 1205 Update",
          "API Request: POST /orders (200 OK)",
          "Queue: Item added to 'orders' queue",
          "Cache: User Session Refreshed",
          "Auth: Token valid (id: admin_01)"
        ];
        const newLog = {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          msg: events[Math.floor(Math.random() * events.length)],
          type: Math.random() > 0.9 ? 'warning' : 'info'
        };
        setLogs(prev => [newLog, ...prev].slice(0, 50));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'docs') return;
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, activeTab]);

  return (
    <div className="h-screen w-full bg-slate-50 font-sans flex flex-col overflow-hidden text-slate-900">
      {/* Header (Professional Polish Theme) */}
      <header className="h-20 bg-slate-900 text-white flex items-center justify-between px-10 border-b-4 border-blue-600 shrink-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2 rounded shadow-lg shadow-blue-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase leading-none">
                WinThor <span className="text-blue-400">Connect</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mt-1">
                E-commerce Infrastructure
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center bg-white/5 p-1 rounded-xl border border-white/10 ml-4">
            <button 
              onClick={() => setActiveTab('docs')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'docs' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Documentação
            </button>
            <button 
              onClick={() => setActiveTab('infra')}
              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'infra' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Infraestrutura
            </button>
          </nav>
        </div>
        <div className="text-right hidden sm:block">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-blink"></div>
              <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">SISTEMA ONLINE</span>
           </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {activeTab === 'docs' ? (
          <>
            {/* Sidebar Navigation */}
            <aside className="w-72 bg-slate-200 border-r border-slate-300 p-6 flex flex-col gap-3 shrink-0 hidden lg:flex">
              <div className="text-[10px] font-bold text-slate-500 mb-4 uppercase tracking-[0.2em]">Estrutura do Projeto</div>
              <div className="flex flex-col gap-2 overflow-y-auto pr-2">
                {slides.map((slide, i) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(i)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left group ${
                      currentSlide === i 
                        ? 'bg-white border-l-4 border-blue-600 shadow-sm text-slate-900 font-bold' 
                        : 'bg-slate-300/30 text-slate-500 hover:bg-slate-300/50'
                    }`}
                  >
                    <span className={`text-[10px] font-black w-6 tabular-nums ${currentSlide === i ? 'text-blue-600' : 'text-slate-400'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs truncate">{slide.shortTitle}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-auto">
                <div className="p-5 bg-slate-900 rounded-2xl text-white shadow-xl">
                  <p className="text-[10px] text-blue-400 uppercase font-black mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> Dica de Ouro
                  </p>
                  <p className="text-[11px] leading-relaxed text-slate-400">
                    A sequência do pedido é <strong>transacional</strong>. Insira o cabeçalho, depois os itens e por fim confirme.
                  </p>
                </div>
              </div>
            </aside>

            {/* Main Presentation Stage */}
            <main className="flex-1 p-6 md:p-12 bg-white relative overflow-hidden flex flex-col">
              <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentSlide}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-1 flex flex-col"
                  >
                    {currentSlide > 0 && (
                      <div className="flex items-center justify-between mb-8 border-b-2 border-slate-50 pb-6 shrink-0">
                        <div>
                          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">{slides[currentSlide].title}</h2>
                          <p className="text-slate-500 mt-2 font-medium text-lg leading-none">{slides[currentSlide].subtitle}</p>
                        </div>
                        <div className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full shadow-lg shadow-blue-200 uppercase tracking-widest whitespace-nowrap">
                          {slides[currentSlide].tag}
                        </div>
                      </div>
                    )}
                    <div className="flex-1 h-full min-h-0">
                      {slides[currentSlide].content}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Controls Overlay for Tablet/Mobile */}
              <div className="absolute bottom-10 right-10 flex gap-4 lg:hidden">
                 <button onClick={prevSlide} className="p-4 bg-slate-900 text-white rounded-full shadow-2xl"><ChevronLeft /></button>
                 <button onClick={nextSlide} className="p-4 bg-slate-900 text-white rounded-full shadow-2xl"><ChevronRight /></button>
              </div>
            </main>
          </>
        ) : (
          <main className="flex-1 overflow-auto bg-slate-50 p-8 space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2">
                   <div className="flex items-center justify-between">
                      <Cpu className="w-5 h-5 text-blue-600" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CPU Usage</span>
                   </div>
                   <div className="text-3xl font-black text-slate-900 italic tracking-tighter">{metrics.cpu.toFixed(1)}%</div>
                   <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${metrics.cpu}%` }} className="h-full bg-blue-600" />
                   </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2">
                   <div className="flex items-center justify-between">
                      <HardDrive className="w-5 h-5 text-purple-600" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Memory</span>
                   </div>
                   <div className="text-3xl font-black text-slate-900 italic tracking-tighter">{metrics.ram.toFixed(1)}%</div>
                   <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${metrics.ram}%` }} className="h-full bg-purple-600" />
                   </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2">
                   <div className="flex items-center justify-between">
                      <Activity className="w-5 h-5 text-emerald-600" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Latency</span>
                   </div>
                   <div className="text-3xl font-black text-slate-900 italic tracking-tighter">{metrics.latency.toFixed(0)} ms</div>
                   <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Status: Healthy</div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-2">
                   <div className="flex items-center justify-between">
                      <Zap className="w-5 h-5 text-amber-600" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">OCR Accuracy</span>
                   </div>
                   <div className="text-3xl font-black text-slate-900 italic tracking-tighter">{metrics.ocrAccuracy.toFixed(2)}%</div>
                   <div className="text-[10px] font-bold text-slate-400 italic">Target: 98.0%</div>
                </div>
             </div>

             <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-8">
                   <div className="bg-slate-900 p-8 rounded-[40px] shadow-2xl border border-white/5 relative overflow-hidden h-[400px]">
                      <div className="absolute top-0 right-0 p-10 opacity-10"><Monitor className="w-40 h-40 text-blue-400" /></div>
                      <div className="relative z-10 h-full flex flex-col">
                         <div className="flex items-center justify-between mb-8">
                            <div>
                               <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">Real-time Telemetry</h3>
                               <p className="text-xs text-slate-500 font-mono">System Throughput & Load</p>
                            </div>
                            <div className="flex gap-2">
                               <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-blue-400 uppercase">Live</div>
                               <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-bold text-slate-500 uppercase">24h</div>
                            </div>
                         </div>
                         <div className="flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                               <AreaChart data={telemetry}>
                                  <defs>
                                     <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                     </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                  <XAxis dataKey="time" hide />
                                  <YAxis stroke="#475569" fontSize={10} strokeWidth={0} />
                                  <Tooltip 
                                     contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                                     itemStyle={{ color: '#3b82f6', fontSize: '12px', fontWeight: 'bold' }}
                                  />
                                  <Area type="monotone" dataKey="val" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVal)" strokeWidth={3} />
                               </AreaChart>
                            </ResponsiveContainer>
                         </div>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
                         <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-3 rounded-2xl"><Monitor className="w-6 h-6 text-blue-600" /></div>
                            <h4 className="font-black text-slate-900 italic uppercase">OCR Engine</h4>
                         </div>
                         <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Process</span>
                               <span className="text-xs font-black font-mono">ocr_v4_worker</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</span>
                               <span className="flex items-center gap-2 text-xs font-black font-mono text-green-600">
                                  <div className="w-2 h-2 bg-green-600 rounded-full animate-blink"></div>
                                  ACTIVE
                               </span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Queue</span>
                               <span className="text-xs font-black font-mono">{metrics.queueDepth} Items</span>
                            </div>
                         </div>
                      </div>

                      <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-6">
                         <div className="flex items-center gap-4">
                            <div className="bg-emerald-100 p-3 rounded-2xl"><Globe className="w-6 h-6 text-emerald-600" /></div>
                            <h4 className="font-black text-slate-900 italic uppercase">Network Nodes</h4>
                         </div>
                         <div className="space-y-4">
                            {[1, 2, 3].map(node => (
                               <div key={node} className="flex items-center justify-between p-3 border border-slate-100 rounded-2xl">
                                  <div className="flex items-center gap-3">
                                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                     <span className="text-[10px] font-black text-slate-900 uppercase">Node-0{node}</span>
                                  </div>
                                  <div className="text-[10px] font-mono text-slate-400">UP: {node * 12}d 0{node}h</div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
                   <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <Terminal className="w-5 h-5 text-slate-500" />
                         <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">System Logs</span>
                      </div>
                      <button className="text-[10px] text-blue-600 font-black uppercase hover:underline">Clear</button>
                   </div>
                   <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] space-y-2">
                      {logs.map((log) => (
                         <div key={log.id} className={`p-2 rounded border-l-2 transition-all ${log.type === 'warning' ? 'bg-amber-50 border-amber-500 text-amber-700' : 'bg-slate-50 border-blue-500 text-slate-600'}`}>
                            <span className="opacity-50 mr-2">[{log.time}]</span>
                            <span className="font-bold">{log.msg}</span>
                         </div>
                      ))}
                      {logs.length === 0 && <div className="text-center text-slate-400 py-10 italic uppercase tracking-widest">Aguardando eventos...</div>}
                   </div>
                </div>
             </div>
          </main>
        )}
      </div>

      {/* Modern Footer Bar */}
      <footer className="h-14 bg-slate-100 border-t border-slate-300 px-10 flex items-center justify-between text-[11px] text-slate-500 font-bold shrink-0">
        <div className="flex gap-6 uppercase tracking-[0.2em] items-center">
          <span className="flex items-center gap-2 text-slate-900"><Layers className="w-3 h-3 text-blue-600" /> {activeTab === 'docs' ? 'Fluxo Técnico PCSIS2699' : 'Infrastructure Telemetry'}</span>
          <div className="w-px h-4 bg-slate-300 hidden sm:block"></div>
          <span className="hidden sm:inline">WinThor ERP Connector</span>
        </div>
        
        <div className="flex items-center gap-6">
           {activeTab === 'docs' && (
             <div className="hidden md:flex items-center gap-4">
                <button 
                  id="btn-prev"
                  onClick={prevSlide}
                  className="p-1 hover:text-slate-900 transition-colors"
                  title="Voltar"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                   <span className="text-slate-900 font-black tabular-nums">
                      SLIDE {String(currentSlide + 1).padStart(2, '0')} DE {String(slides.length).padStart(2, '0')}
                   </span>
                   <div className="h-1.5 w-32 bg-slate-300 rounded-full overflow-hidden">
                     <motion.div 
                      className="h-full bg-blue-600"
                      animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                     />
                   </div>
                </div>
                <button 
                  id="btn-next"
                  onClick={nextSlide}
                  className="p-1 hover:text-slate-900 transition-colors"
                  title="Avançar"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
             </div>
           )}
           <button className="text-xs text-blue-600 hover:underline uppercase tracking-widest hidden lg:block">
              Support Terminal
           </button>
        </div>
      </footer>
    </div>
  );
}
