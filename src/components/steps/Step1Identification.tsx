import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CORPORATE_BLUE = "#283578";

const erpOptions = [
  "Adsomos", "Agely", "Alterdata", "Alsti", "Conceito", "Consistem", "Dapic/ Webpic",
  "Erp Interno", "Linx", "Matriz", "Millennium", "New Century", "Prorius", "Omie",
  "Organiza têxtil", "Sankhya", "Senior", "Siesa", "Sisplan", "Smart.sis",
  "SAP Business One", "Systêxtil", "Totvs Moda", "Upis", "Wiki", "Outro",
];

function FieldHelp({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <HelpCircle className="w-3.5 h-3.5 text-muted-foreground cursor-help inline ml-1" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[250px] text-xs">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}

export default function Step1Identification({ data = {}, update, isPrint }: any) {
  const handleChange = (field: string, val: string) => {
    if (update) update({ ...data, [field]: val });
  };

  // --- LAYOUT EXCLUSIVO PARA O PDF (PÁGINA 1) ---
  if (isPrint) {
    return (
      <div className="space-y-8">
        <div className="border-b-2 pb-2" style={{ borderColor: CORPORATE_BLUE }}>
          <h2 className="text-xl font-bold" style={{ color: CORPORATE_BLUE }}>1. Identificação do Projeto</h2>
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-12">
          <div className="border-b pb-1">
            <p className="text-[10px] uppercase font-bold text-slate-500">Cliente:</p>
            <p className="text-sm font-medium">{data.cliente || "Não informado"}</p>
          </div>
          <div className="border-b pb-1">
            <p className="text-[10px] uppercase font-bold text-slate-500">ERP Parceiro:</p>
            <p className="text-sm font-medium">{data.erp || "Não informado"}</p>
          </div>
          <div className="border-b pb-1">
            <p className="text-[10px] uppercase font-bold text-slate-500">Implantador Responsável:</p>
            <p className="text-sm font-medium">{data.responsavel || "Não informado"}</p>
          </div>
        </div>

        <div className="mt-4 border-b pb-2">
          <p className="text-[10px] uppercase font-bold text-slate-500">Escopo da Integração:</p>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{data.escopo || "Não informado"}</p>
        </div>
      </div>
    );
  }

  // --- LAYOUT PARA A TELA ---
  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 px-2 md:px-0">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="p-4 md:pb-3">
          <CardTitle className="text-sm md:text-base flex items-center gap-2" style={{ color: CORPORATE_BLUE }}>
            <Building2 className="w-4 h-4 md:w-5 md:h-5" /> Instruções
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Preencha os dados de identificação do projeto de integração.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="mx-2 md:mx-0 shadow-sm">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl" style={{ color: CORPORATE_BLUE }}>Dados do Projeto</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-bold text-sm md:text-base flex items-center">
              Cliente <span className="text-red-500 ml-1">*</span>
              <FieldHelp text="Nome da empresa do cliente final." />
            </Label>
            <Input 
              placeholder="Ex: Malwee, Hering..." 
              value={data.cliente || ""} 
              onChange={(e) => handleChange("cliente", e.target.value)}
              className="h-10 md:h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-sm md:text-base flex items-center">
              ERP Parceiro <span className="text-red-500 ml-1">*</span>
            </Label>
            <Select value={data.erp || ""} onValueChange={(v) => handleChange("erp", v)}>
              <SelectTrigger className="h-10 md:h-11">
                <SelectValue placeholder="Selecione o ERP" />
              </SelectTrigger>
              <SelectContent>
                {erpOptions.map((erp) => (
                  <SelectItem key={erp} value={erp}>{erp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-sm md:text-base flex items-center">
              Implantador Responsável <span className="text-red-500 ml-1">*</span>
            </Label>
            <Input 
              placeholder="Nome do implantador" 
              value={data.responsavel || ""} 
              onChange={(e) => handleChange("responsavel", e.target.value)}
              className="h-10 md:h-11"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="font-bold text-sm md:text-base flex items-center">
              Escopo da Integração <span className="text-red-500 ml-1">*</span>
            </Label>
            <Textarea 
              placeholder="Descreva os módulos que serão integrados..." 
              value={data.escopo || ""} 
              onChange={(e) => handleChange("escopo", e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
