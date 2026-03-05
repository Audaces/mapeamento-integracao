import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Step1Identification({ data, update, isPrint }: any) {
  const handleChange = (field: string, val: string) => update({ ...data, [field]: val });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Cliente <span className="text-red-500">*</span></Label>
          <Input value={data.cliente || ""} onChange={(e) => handleChange("cliente", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>ERP Parceiro <span className="text-red-500">*</span></Label>
          <Select value={data.erp || ""} onValueChange={(v) => handleChange("erp", v)}>
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Totvs">Totvs</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
              <SelectItem value="SAP">SAP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Responsável <span className="text-red-500">*</span></Label>
        <Input value={data.responsavel || ""} onChange={(e) => handleChange("responsavel", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Escopo <span className="text-red-500">*</span></Label>
        <Textarea value={data.escopo || ""} onChange={(e) => handleChange("escopo", e.target.value)} />
      </div>
    </div>
  );
}
