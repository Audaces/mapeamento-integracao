import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BookOpen, CheckSquare } from "lucide-react";

const CORPORATE_BLUE = "#283578";

const validationChecklist = [
  "Todos os campos obrigatórios foram mapeados",
  "Os tipos de dados foram validados entre os sistemas",
  "As regras de negócio foram documentadas e aprovadas pelo cliente",
  "O fluxo da ficha técnica foi validado com a equipe do cliente",
  "As telas do ERP foram identificadas e documentadas",
  "Os responsáveis por cada etapa foram definidos",
  "Existe plano de contingência para o go-live",
];

export default function Step6Rules({ data = { erpPrints: "", fichaModel: "", checklist: {} }, update, isPrint }: any) {
  
  // Função para salvar os links
  const handleInputChange = (field: string, value: string) => {
    update({ ...data, [field]: value });
  };

  // Função para salvar o checklist
  const handleCheckChange = (item: string, checked: boolean) => {
    const newChecklist = { ...data.checklist, [item]: checked };
    update({ ...data, checklist: newChecklist });
  };

  // --- LAYOUT EXCLUSIVO PARA O PDF ---
  if (isPrint) {
    return (
      <div className="space-y-8">
        <div className="border-b-2 pb-2" style={{ borderColor: CORPORATE_BLUE }}>
          <h2 className="text-xl font-bold" style={{ color: CORPORATE_BLUE }}>4. Documentos e Checklist Final</h2>
        </div>

        <div className="space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-slate-800">Links de Referência:</h3>
            <div className="mt-2 space-y-2">
              <p><span className="font-medium text-slate-600">Prints ERP:</span> {data.erpPrints || "Não informado"}</p>
              <p><span className="font-medium text-slate-600">Modelo de Ficha:</span> {data.fichaModel || "Não informado"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-slate-800 mb-3">Checklist de Verificação:</h3>
          <div className="space-y-2">
            {validationChecklist.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <div className={`w-4 h-4 border rounded flex items-center justify-center ${data.checklist[item] ? 'bg-green-500 border-green-500' : 'border-slate-300'}`}>
                  {data.checklist[item] && <span className="text-white text-[10px]">✓</span>}
                </div>
                <span className={data.checklist[item] ? "text-slate-900" : "text-slate-400 line-through"}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- LAYOUT RESPONSIVO PARA A TELA ---
  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 px-2 md:px-0">
      {/* Instruções */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="p-4 md:pb-3">
          <CardTitle className="text-sm md:text-base flex items-center gap-2" style={{ color: CORPORATE_BLUE }}>
            <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            Instruções
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Adicione os links de referência e valide o mapeamento com o checklist final.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Links de Documentos */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg" style={{ color: CORPORATE_BLUE }}>Documentos e Referências</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Links para prints do ERP e modelo de ficha do cliente
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0 space-y-4">
          <div className="space-y-2">
            <Label className="text-xs md:text-sm font-semibold">Print das telas do ERP</Label>
            <Input 
              placeholder="Cole o link ou caminho do documento..." 
              value={data.erpPrints || ""}
              onChange={(e) => handleInputChange("erpPrints", e.target.value)}
              className="h-10 md:h-11 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs md:text-sm font-semibold">Modelo de ficha técnica do cliente</Label>
            <Input 
              placeholder="Cole o link ou caminho do documento..." 
              value={data.fichaModel || ""}
              onChange={(e) => handleInputChange("fichaModel", e.target.value)}
              className="h-10 md:h-11 text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Checklist de Validação */}
      <Card className="border-[hsl(var(--step-complete))]/30 bg-[hsl(var(--step-complete))]/5 mb-6">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg flex items-center gap-2" style={{ color: "hsl(var(--step-complete))" }}>
            <CheckSquare className="w-5 h-5" />
            Checklist de Mapeamento
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Confirme os itens antes de finalizar
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
          <div className="grid gap-4">
            {validationChecklist.map((item) => (
              <div key={item} className="flex items-start gap-3 group">
                <Checkbox 
                  id={item} 
                  checked={!!data.checklist[item]}
                  onCheckedChange={(checked) => handleCheckChange(item, !!checked)}
                  className="mt-1 h-5 w-5 md:h-4 md:w-4 border-slate-400"
                />
                <Label 
                  htmlFor={item} 
                  className="text-sm md:text-base font-medium leading-relaxed cursor-pointer select-none text-slate-700 group-hover:text-slate-900 transition-colors"
                >
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
