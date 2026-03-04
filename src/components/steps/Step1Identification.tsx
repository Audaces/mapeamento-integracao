import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Building2 } from "lucide-react";

const erpOptions = [
  "Adsomos",
  "Agely",
  "Alterdata",
  "Alsti",
  "Conceito",
  "Consistem",
  "Dapic/ Webpic",
  "Erp Interno",
  "Linx",
  "Matriz",
  "Millennium",
  "New Century",
  "Prorius",
  "Omie",
  "Organiza têxtil",
  "Sankhya",
  "Senior",
  "Siesa",
  "Sisplan",
  "Smart.sis",
  "SAP Business One",
  "Systêxtil",
  "Totvs Moda",
  "Upis",
  "Wiki",
  "Outro",
];

function FieldHelp({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help inline ml-1" />
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs text-xs">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

export default function Step1Identification() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Instruções
          </CardTitle>
          <CardDescription>
            Preencha os dados de identificação do projeto de integração. Essas informações
            serão usadas como referência em todas as etapas seguintes.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dados do Projeto</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>
              Cliente
              <FieldHelp text="Nome da empresa/marca do cliente final que utilizará a integração." />
            </Label>
            <Input placeholder="Ex: Malwee, Hering, Farm..." />
          </div>

          <div className="space-y-2">
            <Label>
              ERP Parceiro
              <FieldHelp text="Selecione o sistema ERP utilizado pelo cliente. Se não estiver na lista, escolha 'Outro'." />
            </Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o ERP" />
              </SelectTrigger>
              <SelectContent>
                {erpOptions.map((erp) => (
                  <SelectItem key={erp} value={erp}>
                    {erp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Implantador Responsável
              <FieldHelp text="Nome do analista/consultor Audaces responsável por este mapeamento." />
            </Label>
            <Input placeholder="Nome do implantador" />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>
              Escopo da Integração
              <FieldHelp text="Descreva brevemente quais módulos/funcionalidades serão integrados (ex: Ficha técnica, Materiais, Custos)." />
            </Label>
            <Textarea placeholder="Ex: Integração da ficha técnica completa incluindo materiais, cores, tamanhos e custos de produção..." />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
