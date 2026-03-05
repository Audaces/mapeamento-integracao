import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast"; // Verifique se este hook existe no seu projeto
import {
  Building2,
  GitBranch,
  Monitor,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Printer,
  CheckCircle2,
} from "lucide-react";
import Step1Identification from "./steps/Step1Identification";
import Step4Workflow from "./steps/Step4Workflow";
import Step5ErpScreens from "./steps/Step5ErpScreens";
import Step6Rules from "./steps/Step6Rules";

const CORPORATE_BLUE = "#283578";

const steps = [
  { id: 1, title: "Identificação", icon: Building2 },
  { id: 2, title: "Fluxo da Ficha", icon: GitBranch },
  { id: 3, title: "Telas do ERP", icon: Monitor },
  { id: 4, title: "Regras e Docs", icon: BookOpen },
];

export default function MappingLayout() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  
  // ESTADO GLOBAL DOS DADOS (Isso resolve o PDF em branco)
  const [formData, setFormData] = useState({
    step1: {}, // Identificação
    step2: [], // Fluxo da Ficha (Lista)
    step3: [], // Telas do ERP (Lista)
    step4: {}, // Regras
  });

  const updateFormData = (stepKey: string, data: any) => {
    setFormData(prev => ({ ...prev, [stepKey]: data }));
  };

  const progress = (completedSteps.size / steps.length) * 100;

  // VALIDAÇÃO DE CAMPOS
  const isStepValid = () => {
    if (currentStep === 0) { // Identificação
      const d = formData.step1 as any;
      return d.empresa && d.responsavel && d.data; 
    }
    if (currentStep === 1) { // Fluxo da Ficha
      return formData.step2.length >= 3;
    }
    if (currentStep === 2) { // Telas do ERP
      return formData.step3.length >= 3;
    }
    return true; // Step 4 livre ou adicione regra aqui
  };

  const markComplete = () => {
    if (!isStepValid()) {
      const msg = (currentStep === 1 || currentStep === 2) 
        ? "Adicione pelo menos 3 itens para prosseguir." 
        : "Preencha todos os campos obrigatórios.";
      
      toast({ title: "Atenção", description: msg, variant: "destructive" });
      return;
    }
    
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  // Mapeamento dos componentes passando os dados
  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Step1Identification data={formData.step1} update={(d) => updateFormData('step1', d)} />;
      case 1: return <Step4Workflow items={formData.step2} update={(d) => updateFormData('step2', d)} />;
      case 2: return <Step5ErpScreens items={formData.step3} update={(d) => updateFormData('step3', d)} />;
      case 3: return <Step6Rules data={formData.step4} update={(d) => updateFormData('step4', d)} />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="no-print w-64 shrink-0 bg-sidebar-background flex flex-col border-r border-sidebar-border">
        <div className="p-3 border-b border-sidebar-border">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: CORPORATE_BLUE }}>
            Audaces
          </h1>
          <p className="text-[10px] font-medium mt-0.5" style={{ color: CORPORATE_BLUE }}>
            Mapeamento de Dados ERP
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {steps.map((step, i) => {
            const isActive = i === currentStep;
            const isComplete = completedSteps.has(i);

            return (
              <button
                key={step.id}
                onClick={() => isComplete || i < currentStep ? setCurrentStep(i) : null}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-gray-600 hover:bg-sidebar-accent/50" // CINZA MAIS ESCURO AQUI
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0",
                    isComplete ? "bg-green-600 text-white" : 
                    isActive ? "text-white" : "bg-gray-300 text-gray-600" // CINZA MAIS ESCURO NO ÍCONE
                  )}
                  style={isActive && !isComplete ? { backgroundColor: CORPORATE_BLUE } : {}}
                >
                  {isComplete ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                </span>
                <span className={cn("truncate", !isActive && "text-gray-600")}>{step.title}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Progresso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          {/* BOTÃO PDF SEMPRE VISÍVEL E COM COR */}
          <Button
            size="sm"
            className="w-full text-white shadow-md"
            style={{ backgroundColor: CORPORATE_BLUE }}
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4 mr-2" />
            Gerar PDF Completo
          </Button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="no-print border-b px-6 py-2 flex items-center justify-between bg-card">
          <div>
            <p className="text-[10px] text-muted-foreground">Etapa {currentStep + 1} de {steps.length}</p>
            <h2 className="text-md font-semibold">{steps[currentStep].title}</h2>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentStep(currentStep - 1)} disabled={currentStep === 0}>
              Anterior
            </Button>
            <Button size="sm" onClick={markComplete} style={{ backgroundColor: CORPORATE_BLUE }} className="text-white">
              {currentStep < steps.length - 1 ? "Próximo" : "Finalizar"}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 print:hidden">
          {renderStep()}
        </div>

        {/* ÁREA DE IMPRESSÃO - PUXANDO DADOS DO formData */}
        <div className="hidden print:block p-10">
          <header className="flex justify-between items-center border-b-2 pb-4 mb-10" style={{ borderColor: CORPORATE_BLUE }}>
            <h1 className="text-3xl font-bold" style={{ color: CORPORATE_BLUE }}>Audaces</h1>
            <p className="text-sm font-bold" style={{ color: CORPORATE_BLUE }}>Mapeamento de Dados ERP</p>
          </header>

          <section className="print-section">
            <h2 className="text-xl font-bold mb-4" style={{ color: CORPORATE_BLUE }}>1. Identificação</h2>
            <pre className="whitespace-pre-wrap font-sans">{JSON.stringify(formData.step1, null, 2)}</pre>
          </section>

          <section className="print-section">
            <h2 className="text-xl font-bold mb-4" style={{ color: CORPORATE_BLUE }}>2. Fluxo da Ficha</h2>
            {formData.step2.map((item: any, i) => <div key={i}>- {item.nome || item}</div>)}
          </section>

          {/* Repita para Step 3 e 4 formatando como desejar */}
        </div>
      </main>
    </div>
  );
}
