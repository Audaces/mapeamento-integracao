import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Monitor, Plus } from "lucide-react";

const CORPORATE_BLUE = "#283578";

const categories = [
  { key: "produto", label: "Produto", fields: ["Referência", "Descrição", "Coleção", "Linha", "Grupo", "Subgrupo"] },
  { key: "materiais", label: "Materiais", fields: ["Código", "Descrição", "Unidade", "Consumo", "Fornecedor", "Composição"] },
  { key: "operacoes", label: "Operações", fields: ["Operação", "Setor", "Tempo padrão", "Máquina", "Sequência"] },
  { key: "outros", label: "Outros", fields: ["Campo", "Descrição", "Valor padrão", "Origem do dado"] },
];

const dataTypes = ["Texto", "Número", "Data", "Lista/Enum", "Booleano", "Código"];

export default function Step5ErpScreens({ data = [], update, isPrint }: any) {
  // Estado local para controlar as linhas de cada aba
  const [localRows, setLocalRows] = useState<any[]>(data.length > 0 ? data : []);

  // Inicializa com algumas linhas vazias se estiver totalmente vazio
  useEffect(() => {
    if (localRows.length === 0) {
      const initial = categories.flatMap(cat => 
        cat.fields.slice(0, 3).map(f => ({ category: cat.key, tela: "", campo: f, tipo: "", obrigatorio: "" }))
      );
      setLocalRows(initial);
    }
  }, []);

  const handleInputChange = (index: number, field: string, value: string) => {
    const updated = [...localRows];
    // Se a linha não existe no array ainda (caso de adicionar linha), nós a criamos
    if (!updated[index]) updated[index] = { category: "produto", tela: "", campo: "", tipo: "", obrigatorio: "" };
    
    updated[index][field] = value;
    setLocalRows(updated);

    // Envia para o MappingLayout apenas as linhas que têm "Tela" ou "Campo" preenchidos
    const filledRows = updated.filter(row => row.tela?.trim() !== "" || row.campo?.trim() !== "");
    update(filledRows);
  };

  const addRow = (categoryKey: string) => {
    setLocalRows([...localRows, { category: categoryKey, tela: "", campo: "", tipo: "", obrigatorio: "" }]);
  };

  if (isPrint) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold" style={{ color: CORPORATE_BLUE }}>3. Telas e Campos do ERP</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoria</TableHead>
              <TableHead>Módulo / Tela</TableHead>
              <TableHead>Campo no ERP</TableHead>
              <TableHead>Tipo / Obrig.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localRows.filter(r => r.tela).map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-bold">{row.category}</TableCell>
                <TableCell>{row.tela}</TableCell>
                <TableCell>{row.campo}</TableCell>
                <TableCell>{row.tipo} ({row.obrigatorio === 'S' ? 'Sim' : 'Não'})</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Card className="border-primary/20 bg-primary/5 no-print">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2" style={{ color: CORPORATE_BLUE }}>
            <Monitor className="w-5 h-5" /> Instruções
          </CardTitle>
          <CardDescription>
            Liste as telas do ERP envolvidas. Preencha ao menos <strong>3 campos no total</strong> para prosseguir.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle style={{ color: CORPORATE_BLUE }}>Telas e Campos do ERP</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="produto">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-slate-100 p-1">
              {categories.map((cat) => (
                <TabsTrigger key={cat.key} value={cat.key} className="text-xs px-4">
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => (
              <TabsContent key={cat.key} value={cat.key} className="mt-4 animate-in fade-in duration-300">
                <p className="text-xs text-muted-foreground mb-4">
                  Sugestões para {cat.label}: <span className="italic">{cat.fields.join(", ")}</span>
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Módulo / Tela <span className="text-red-500">*</span></TableHead>
                      <TableHead>Campo no ERP <span className="text-red-500">*</span></TableHead>
                      <TableHead>Tipo de Dado <span className="text-red-500">*</span></TableHead>
                      <TableHead className="w-24">Obrig. <span className="text-red-500">*</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {localRows.map((row, i) => {
                      if (row.category !== cat.key) return null;
                      return (
                        <TableRow key={i}>
                          <TableCell>
                            <Input 
                              placeholder="Ex: Cadastro de Produto" 
                              className="text-xs" 
                              value={row.tela || ""}
                              onChange={(e) => handleInputChange(i, "tela", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Input 
                              placeholder="Nome do campo" 
                              className="text-xs" 
                              value={row.campo || ""}
                              onChange={(e) => handleInputChange(i, "campo", e.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={row.tipo || ""} 
                              onValueChange={(v) => handleInputChange(i, "tipo", v)}
                            >
                              <SelectTrigger className="text-xs">
                                <SelectValue placeholder="Tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                {dataTypes.map((t) => (
                                  <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={row.obrigatorio || ""} 
                              onValueChange={(v) => handleInputChange(i, "obrigatorio", v)}
                            >
                              <SelectTrigger className="text-xs">
                                <SelectValue placeholder="S/N" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="S">Sim</SelectItem>
                                <SelectItem value="N">Não</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-dashed border-slate-300"
                  onClick={() => addRow(cat.key)}
                >
                  <Plus className="w-4 h-4 mr-1" /> Adicionar linha em {cat.label}
                </Button>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
