import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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

const steps = [
  { id: 1, title: "Identificação", icon: Building2 },
  { id: 2, title: "Fluxo da Ficha", icon: GitBranch },
  { id: 3, title: "Telas do ERP", icon: Monitor },
  { id: 4, title: "Regras e Docs", icon: BookOpen },
];

const stepComponents = [
  Step1Identification,
  Step4Workflow,
  Step5ErpScreens,
  Step6Rules,
];

const CORPORATE_BLUE = "#283578";

export default function MappingLayout() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const progress = (completedSteps.size / steps.length) * 100;
  const StepComponent = stepComponents[currentStep];

  const markComplete = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Oculta na impressão */}
      <aside className="no-print w-64 shrink-0 bg-sidebar-background text-sidebar-foreground flex flex-col border-r border-sidebar-border">
        {/* Cabeçalho da Sidebar - Espaçamento reduzido de p-6 para p-3 */}
        <div className="p-3 border-b border-sidebar-border">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: CORPORATE_BLUE }}>
            Audaces
          </h1>
          <p className="text-[10px] font-medium mt-0.5" style={{ color: CORPORATE_BLUE, opacity: 0.9 }}>
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
                onClick={() => setCurrentStep(i)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0",
                    isComplete
                      ? "bg-green-600 text-white"
                      : isActive
                      ? "text-white"
                      : "bg-sidebar-border text-sidebar-foreground/60"
                  )}
                  style={isActive && !isComplete ? { backgroundColor: CORPORATE_BLUE } : {}}
                >
                  {isComplete ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                </span>
                <span className="truncate">{step.title}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-sidebar-foreground/60">
              <span>Progresso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4 mr-2" />
            Gerar PDF Completo
          </Button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header da Etapa Atual - Oculto na impressão */}
        <header className="no-print border-b px-6 py-2 flex items-center justify-between bg-card">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Etapa {currentStep + 1} de {steps.length}
            </p>
            <h2 className="text-md font-semibold text-foreground">
              {steps[currentStep].title}
            </h2>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>
            <Button 
              size="sm" 
              onClick={markComplete} 
              style={{ backgroundColor: CORPORATE_BLUE }}
              className="hover:opacity-90 text-white"
            >
              {currentStep < steps.length - 1 ? (
                <>Próximo <ChevronRight className="w-4 h-4 ml-1" /></>
              ) : (
                "Finalizar"
              )}
            </Button>
          </div>
        </header>

        {/* Conteúdo visível na tela (Interativo) */}
        <div className="flex-1 overflow-auto p-6 print:hidden">
          <StepComponent />
        </div>

        {/* ESTRUTURA EXCLUSIVA PARA O PDF (Invisível na tela) */}
        <div className="hidden print:block">
          {stepComponents.map((Component, index) => (
            <section key={index} className="print-section p-12">
              <div className="flex justify-between items-end border-b-2 pb-4 mb-8" style={{ borderColor: CORPORATE_BLUE }}>
                <div>
                  <h1 className="text-3xl font-bold" style={{ color: CORPORATE_BLUE }}>Audaces</h1>
                  <p className="text-sm font-semibold" style={{ color: CORPORATE_BLUE }}>Mapeamento de Dados ERP</p>
                </div>
                <div className="text-right text-xs text-gray-400 uppercase tracking-widest">
                  {steps[index].title} | {index + 1} de {steps.length}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-6" style={{ color: CORPORATE_BLUE }}>
                  {steps[index].id}. {steps[index].title}
                </h3>
                {/* Renderiza o conteúdo da etapa */}
                <Component />
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
