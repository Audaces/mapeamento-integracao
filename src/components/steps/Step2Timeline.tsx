import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CalendarDays, TrendingUp } from "lucide-react";

const CORPORATE_BLUE = "#283578";

const defaultPhases = [
  { phase: "Mapeamento de Dados", hint: "Levantamento de todos os dados e fluxos" },
  { phase: "Desenvolvimento", hint: "Construção dos conectores e adaptadores" },
  { phase: "Testes Internos", hint: "Validação interna com dados de teste" },
  { phase: "Homologação", hint: "Testes com o cliente utilizando dados reais" },
  { phase: "Treinamento", hint: "Capacitação da equipe do cliente" },
  { phase: "Go-live", hint: "Ativação em produção" },
  { phase: "Acompanhamento", hint: "Suporte intensivo pós-ativação" },
];

const statusOptions = ["Não iniciado", "Em andamento", "Concluído", "Bloqueado"];

export default function Step2Timeline({ data = { rows: [], beneficios: "" }, update, isPrint }: any) {
  
  // Inicializa as linhas se estiverem vazias
  const rows = data.rows?.length > 0 ? data.rows : defaultPhases.map(p => ({ ...p, inicio: "", fim: "", status: "Não iniciado" }));

  const handleRowChange = (index: number, field: string, value: string) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    update({ ...data, rows: newRows });
  };

  const handleBenefitsChange = (val: string) => {
    update({ ...data, beneficios: val });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Instruções */}
      {!isPrint && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2" style={{ color: CORPORATE_BLUE }}>
              <CalendarDays className="w-5 h-5" /> Instruções
            </CardTitle>
            <CardDescription>
              Preencha as datas previstas e o status para cada etapa. Adicione também os benefícios esperados.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Novo Campo: Benefícios Previstos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-md flex items-center gap-2" style={{ color: CORPORATE_BLUE }}>
            <TrendingUp className="w-4 h-4" /> Benefícios Previstos <span className="text-red-500">*</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Descreva quais benefícios/ganhos o cliente espera com esta integração..."
            value={data.beneficios || ""}
            onChange={(e) => handleBenefitsChange(e.target.value)}
            className={isPrint ? "border-none p-0" : "min-h-[80px]"}
          />
        </CardContent>
      </Card>

      {/* Tabela de Cronograma */}
      <Card className={isPrint ? "border-none shadow-none" : ""}>
        <CardHeader>
          <CardTitle style={{ color: CORPORATE_BLUE }}>Cronograma de Implantação</CardTitle>
          <p className="text-xs text-muted-foreground">Preencha ao menos 3 datas para prosseguir <span className="text-red-500">*</span></p>
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
              {rows.map((item: any, index: number) => (
                <TableRow key={item.phase}>
                  <TableCell>
                    <div>
                      <span className="font-medium text-sm">{item.phase}</span>
                      {!isPrint && <p className="text-xs text-muted-foreground mt-0.5">{item.hint}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="date" 
                      className="w-36" 
                      value={item.inicio || ""} 
                      onChange={(e) => handleRowChange(index, "inicio", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="date" 
                      className="w-36" 
                      value={item.fim || ""} 
                      onChange={(e) => handleRowChange(index, "fim", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    {isPrint ? <span>{item.status}</span> : (
                      <Select 
                        value={item.status || "Não iniciado"} 
                        onValueChange={(v) => handleRowChange(index, "status", v)}
                      >
                        <SelectTrigger className="w-36">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
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
