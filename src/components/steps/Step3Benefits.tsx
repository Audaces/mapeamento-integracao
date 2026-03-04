import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Target } from "lucide-react";

const commonBenefits = [
  "Eliminação do retrabalho na digitação de fichas técnicas",
  "Redução de erros na transferência de dados entre sistemas",
  "Rastreabilidade completa de materiais e composições",
  "Padronização de cadastros entre Audaces e ERP",
  "Agilidade na geração de ordens de produção",
  "Visão unificada de custos de produto",
  "Redução do tempo de desenvolvimento de coleção",
  "Melhor controle de estoque de matéria-prima",
  "Automação da criação de fichas no ERP",
  "Integração de grades de tamanho e cores",
];

export default function Step3Benefits() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Instruções
          </CardTitle>
          <CardDescription>
            Identifique os principais benefícios que o cliente espera obter com a integração.
            Marque os itens comuns aplicáveis e descreva benefícios específicos do cliente.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benefícios Comuns</CardTitle>
          <CardDescription>Selecione os que se aplicam a este cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {commonBenefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-2">
                <Checkbox id={benefit} />
                <Label htmlFor={benefit} className="text-sm font-normal leading-snug cursor-pointer">
                  {benefit}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benefícios Específicos do Cliente</CardTitle>
          <CardDescription>Descreva dores ou necessidades particulares deste cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            rows={5}
            placeholder="Ex: O cliente precisa integrar dados de aviamentos que hoje são controlados em planilhas Excel separadas, causando divergências entre o custo previsto e o real..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
