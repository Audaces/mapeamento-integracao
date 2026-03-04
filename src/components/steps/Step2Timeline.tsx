import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const defaultPhases = [
  { phase: "Mapeamento de Dados", hint: "Levantamento de todos os dados e fluxos envolvidos na integração" },
  { phase: "Desenvolvimento", hint: "Construção dos conectores e adaptadores entre Audaces e ERP" },
  { phase: "Testes Internos", hint: "Validação interna com dados de teste antes de envolver o cliente" },
  { phase: "Homologação", hint: "Testes com o cliente utilizando dados reais em ambiente controlado" },
  { phase: "Treinamento", hint: "Capacitação da equipe do cliente no uso da integração" },
  { phase: "Go-live", hint: "Ativação em produção com acompanhamento próximo" },
  { phase: "Acompanhamento Pós-go-live", hint: "Suporte intensivo nos primeiros dias/semanas após ativação" },
];

const statusOptions = ["Não iniciado", "Em andamento", "Concluído", "Bloqueado"];

function statusColor(status: string) {
  switch (status) {
    case "Concluído": return "bg-[hsl(var(--step-complete))] text-white";
    case "Em andamento": return "bg-[hsl(var(--step-active))] text-white";
    case "Bloqueado": return "bg-destructive text-destructive-foreground";
    default: return "bg-muted text-muted-foreground";
  }
}

export default function Step2Timeline() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Instruções
          </CardTitle>
          <CardDescription>
            Preencha as datas de início e conclusão previstas para cada etapa. O status deve
            ser atualizado conforme o projeto avança. As etapas já vêm pré-preenchidas como sugestão.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cronograma de Implantação</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Etapa</TableHead>
                <TableHead>Data Início</TableHead>
                <TableHead>Data Conclusão</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {defaultPhases.map((item) => (
                <TableRow key={item.phase}>
                  <TableCell>
                    <div>
                      <span className="font-medium text-sm">{item.phase}</span>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.hint}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input type="date" className="w-36" />
                  </TableCell>
                  <TableCell>
                    <Input type="date" className="w-36" />
                  </TableCell>
                  <TableCell>
                    <Select defaultValue="Não iniciado">
                      <SelectTrigger className="w-36">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
