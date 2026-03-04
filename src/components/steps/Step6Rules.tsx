import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BookOpen, CheckSquare } from "lucide-react";

const validationChecklist = [
  "Todos os campos obrigatórios foram mapeados",
  "Os tipos de dados foram validados entre os sistemas",
  "As regras de negócio foram documentadas e aprovadas pelo cliente",
  "O fluxo da ficha técnica foi validado com a equipe do cliente",
  "As telas do ERP foram identificadas e documentadas",
  "Os responsáveis por cada etapa foram definidos",
  "Existe plano de contingência para o go-live",
];

export default function Step6Rules() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Instruções
          </CardTitle>
          <CardDescription>
            Adicione links para prints das telas do ERP e o modelo de ficha técnica do cliente.
            Ao final, valide o mapeamento com o checklist de verificação.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos e Referências</CardTitle>
          <CardDescription>
            Links para prints do ERP e modelo de ficha do cliente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            "Print das telas do ERP",
            "Modelo de ficha técnica do cliente",
          ].map((doc) => (
            <div key={doc} className="space-y-1">
              <Label className="text-sm">{doc}</Label>
              <Input placeholder="Cole o link ou caminho do documento..." />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Validation Checklist */}
      <Card className="border-[hsl(var(--step-complete))]/30 bg-[hsl(var(--step-complete))]/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[hsl(var(--step-complete))]" />
            Checklist de Mapeamento
          </CardTitle>
          <CardDescription>
            Confirme que todos os itens foram verificados antes de finalizar o mapeamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {validationChecklist.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Checkbox id={item} />
                <Label htmlFor={item} className="text-sm font-normal leading-snug cursor-pointer">
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
