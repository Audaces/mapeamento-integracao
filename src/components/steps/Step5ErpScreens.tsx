import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Monitor, Plus } from "lucide-react";

const CORPORATE_BLUE = "#283578";

const categories = [
  { key: "produto", label: "Produto", fields: ["Referência", "Descrição", "Coleção", "Linha", "Grupo", "Subgrupo"] },
  { key: "materiais", label: "Materiais", fields: ["Código", "Descrição", "Unidade", "Consumo", "Fornecedor", "Composição"] },
  { key: "operacoes", label: "Operações / Serviços", fields: ["Operação", "Setor", "Tempo padrão", "Máquina", "Sequência"] },
  { key: "outros", label: "Outros Cadastros", fields: ["Campo", "Descrição", "Valor padrão", "Origem do dado"] },
];

const dataTypes = ["Texto", "Número", "Data", "Lista/Enum", "Booleano", "Código"];

export default function Step5ErpScreens({ data = [], update, isPrint }: any) {
  const [localRows, setLocalRows] = useState<any[]>(data.length > 0 ? data : []);

  useEffect(() => {
    if (localRows.length === 0) {
      const initial = categories.flatMap(cat => 
        cat.fields.slice(0, 5).map(f => ({ 
          category: cat.key, 
          categoryLabel: cat.label,
          tela: "", 
          campo: f, 
          tipo: "", 
          obrigatorio: "" 
        }))
      );
      setLocalRows(initial);
      update(initial);
    }
  }, []);

  const handleInputChange = (index: number, field: string, value: string) => {
    const updated = [...localRows];
    if (!updated[index]) return;
    updated[index][field] = value;
    setLocalRows(updated);
    const filledRows = updated.filter(row => row.tela && row.tela.trim() !== "");
    update(filledRows);
  };

  const addRow = (categoryKey: string, categoryLabel: string) => {
    const newRow = { category: categoryKey, categoryLabel, tela: "", campo: "", tipo: "", obrigatorio: "" };
    const updated = [...localRows, newRow];
    setLocalRows(updated);
  };

  if (isPrint) {
    const rowsToPrint = localRows.filter(r => r.tela && r.tela.trim() !== "");
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold" style={{ color: CORPORATE_BLUE }}>3. Telas e Campos do ERP</h3>
        {rowsToPrint.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-slate-300">
                <TableHead className="text-black font-bold">Categoria</TableHead>
                <TableHead className="text-black font-bold">Módulo / Tela</TableHead>
                <TableHead className="text-black font-bold">Campo no ERP</TableHead>
                <TableHead className="text-black font-bold">Tipo / Obrig.</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rowsToPrint.map((row, i) => (
                <TableRow key={i} className="border-b border-slate-100">
                  <TableCell className="font-bold text-slate-900">{row.categoryLabel || row.category}</TableCell>
                  <TableCell>{row.tela}</TableCell>
                  <TableCell>{row.campo}</TableCell>
                  <TableCell>{row.tipo} ({row.obrigatorio === 'S' ? 'Sim' : 'Não'})</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-slate-500 italic text-sm">Nenhuma tela ou campo mapeado.</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 px-1 md:px-0">
      {/* Card de Instruções Adaptável */}
      <Card className="border-primary/20 bg-primary/5 mx-1 md:mx-0">
        <CardHeader className="p-4 md:pb-3">
          <CardTitle className="text-sm md:text-base flex items-center gap-2" style={{ color: CORPORATE_BLUE }}>
            <Monitor className="w-4 h-4 md:w-5 md:h-5" /> Instruções
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Navegue pelas abas e preencha os campos. As 3 primeiras linhas de cada aba são obrigatórias.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="mx-1 md:mx-0 shadow-sm">
        <CardHeader className="p-4 md:p-6 pb-0 md:pb-2">
          <CardTitle className="text-base md:text-xl" style={{ color: CORPORATE_BLUE }}>Telas e Campos do ERP</CardTitle>
        </CardHeader>
        <CardContent className="p-2 md:p-6">
          <Tabs defaultValue="produto">
            {/* TabsList com scroll no mobile se houver muitas categorias */}
            <TabsList className="flex w-full justify-start md:justify-center overflow-x-auto bg-slate-100 p-1 mb-4 no-scrollbar">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat.key} 
                  value={cat.key} 
                  className="text-[10px] md:text-xs px-3 md:px-6 py-2 font-bold uppercase"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((cat) => {
              let categoryRowCount = 0;
              return (
                <TabsContent key={cat.key} value={cat.key} className="animate-in fade-in duration-300">
                  <div className="mb-4 p-3 bg-slate-50 border rounded-md">
                    <p className="text-[10px] md:text-xs text-slate-600 leading-relaxed italic">
                      Dicas: {cat.fields.join(", ")}
                    </p>
                  </div>
                  
                  {/* Container de scroll para a tabela no mobile */}
                  <div className="overflow-x-auto border rounded-md">
                    <Table className="min-w-[700px]">
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="text-slate-900 text-xs py-2">Módulo / Tela</TableHead>
                          <TableHead className="text-slate-900 text-xs py-2">Campo no ERP</TableHead>
                          <TableHead className="text-slate-900 text-xs py-2">Tipo de Dado</TableHead>
                          <TableHead className="w-24 text-slate-900 text-xs py-2 text-center">Obrig.</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {localRows.map((row, i) => {
                          if (row.category !== cat.key) return null;
                          const isRequired = categoryRowCount < 3;
                          categoryRowCount++;
                          const inputClass = `h-9 text-xs ${isRequired ? "pr-6 border-orange-200 shadow-sm" : ""}`;

                          return (
                            <TableRow key={i} className="hover:bg-slate-50/50">
                              <TableCell className="p-2 relative min-w-[180px]">
                                <Input 
                                  placeholder="Ex: Cadastro" 
                                  className={inputClass} 
                                  value={row.tela || ""}
                                  onChange={(e) => handleInputChange(i, "tela", e.target.value)}
                                />
                                {isRequired && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 font-bold text-xs">*</span>}
                              </TableCell>
                              <TableCell className="p-2 relative min-w-[180px]">
                                <Input 
                                  placeholder="Campo" 
                                  className={inputClass} 
                                  value={row.campo || ""}
                                  onChange={(e) => handleInputChange(i, "campo", e.target.value)}
                                />
                                {isRequired && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 font-bold text-xs">*</span>}
                              </TableCell>
                              <TableCell className="p-2 relative min-w-[140px]">
                                <Select value={row.tipo || ""} onValueChange={(v) => handleInputChange(i, "tipo", v)}>
                                  <SelectTrigger className={inputClass}>
                                    <SelectValue placeholder="Tipo" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {dataTypes.map((t) => (<SelectItem key={t} value={t}>{t}</SelectItem>))}
                                  </SelectContent>
                                </Select>
                                {isRequired && <span className="absolute right-8 top-1/2 -translate-y-1/2 text-red-500 font-bold text-xs z-10">*</span>}
                              </TableCell>
                              <TableCell className="p-2 relative min-w-[100px]">
                                <Select value={row.obrigatorio || ""} onValueChange={(v) => handleInputChange(i, "obrigatorio", v)}>
                                  <SelectTrigger className={inputClass}>
                                    <SelectValue placeholder="S/N" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="S">Sim</SelectItem>
                                    <SelectItem value="N">Não</SelectItem>
                                  </SelectContent>
                                </Select>
                                {isRequired && <span className="absolute right-8 top-1/2 -translate-y-1/2 text-red-500 font-bold text-xs z-10">*</span>}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {/* Guia de arraste para mobile */}
                  <div className="md:hidden text-[9px] text-center text-slate-400 py-2 italic">
                    Arraste a tabela para o lado para ver todas as colunas →
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 border-dashed border-slate-300 w-full text-xs font-semibold py-5"
                    onClick={() => addRow(cat.key, cat.label)}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Adicionar linha em {cat.label}
                  </Button>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
