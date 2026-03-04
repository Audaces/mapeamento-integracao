import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GitBranch } from "lucide-react";

const exampleRows = [
  {
    stage: "Criação do Modelo",
    system: "Audaces Isa/Idea",
    area: "Estilo / Design",
    data: "Croqui, referência, coleção, linha",
    obs: "Dados iniciais do produto",
  },
  {
    stage: "Desenvolvimento do Produto",
    system: "Audaces Isa/Idea + ERP",
    area: "Engenharia de Produto",
    data: "Materiais, consumos, fornecedores, cores",
    obs: "Ficha parcial com BOM",
  },
  {
    stage: "Aprovação de Amostra",
    system: "Audaces Idea",
    area: "Qualidade / Estilo",
    data: "Status de aprovação, comentários",
    obs: "Workflow de aprovação",
  },
  {
    stage: "Ficha Técnica Final",
    system: "Audaces Isa/Idea → ERP",
    area: "Engenharia / PCP",
    data: "Ficha completa, grade, custos",
    obs: "Ponto de integração principal",
  },
  {
    stage: "Ordem de Produção",
    system: "ERP",
    area: "PCP",
    data: "Quantidade, prazo, roteiro",
    obs: "Gerada a partir da ficha integrada",
  },
];

export default function Step4Workflow() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-primary" />
            Instruções
          </CardTitle>
          <CardDescription>
            Descreva os benefícios esperados com a integração e mapeie o fluxo completo da ficha
            técnica no cliente — desde a criação do modelo até a ordem de produção.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefícios Esperados</CardTitle>
          <CardDescription>
            Descreva os principais benefícios e dores que o cliente espera resolver com a integração
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={5}
            placeholder="Ex: Eliminação do retrabalho na digitação de fichas técnicas, redução de erros na transferência de dados, rastreabilidade de materiais, padronização de cadastros, agilidade na geração de ordens de produção..."
          />
        </CardContent>
      </Card>

      {/* Example reference */}
      <Card className="border-accent/30 bg-accent/5">
        <CardHeader>
          <CardTitle className="text-base text-accent-foreground">📋 Exemplo Ilustrativo (apenas referência)</CardTitle>
          <CardDescription>
            Esta tabela é apenas um <strong>exemplo genérico</strong> para servir de inspiração. 
            <strong> Preencha o fluxo real do cliente na tabela editável logo abaixo ↓</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Etapa</TableHead>
                <TableHead>Sistema</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Dados Envolvidos</TableHead>
                <TableHead>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exampleRows.map((row) => (
                <TableRow key={row.stage} className="text-sm">
                  <TableCell className="font-medium">{row.stage}</TableCell>
                  <TableCell>{row.system}</TableCell>
                  <TableCell>{row.area}</TableCell>
                  <TableCell>{row.data}</TableCell>
                  <TableCell className="text-muted-foreground">{row.obs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Editable table */}
      <Card>
        <CardHeader>
          <CardTitle>Fluxo do Cliente</CardTitle>
          <CardDescription>Preencha com o fluxo real do cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Etapa</TableHead>
                <TableHead>Sistema Utilizado</TableHead>
                <TableHead>Área Responsável</TableHead>
                <TableHead>Dados Envolvidos</TableHead>
                <TableHead>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Input placeholder={`Etapa ${i + 1}`} />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Ex: Audaces / ERP" />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Ex: Engenharia" />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Ex: Materiais, cores..." />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="Observações" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
