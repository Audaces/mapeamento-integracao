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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="no-print w-64 shrink-0 bg-sidebar-background text-sidebar-foreground flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-lg font-bold tracking-tight text-sidebar-primary-foreground">
            Audaces
          </h1>
          <p className="text-xs text-sidebar-foreground/70 mt-1">
            Mapeamento de Dados ERP
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {steps.map((step, i) => {
            const isActive = i === currentStep;
            const isComplete = completedSteps.has(i);
            const Icon = step.icon;

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(i)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors text-left",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold shrink-0",
                    isComplete
                      ? "bg-[hsl(var(--step-complete))] text-white"
                      : isActive
                      ? "bg-[hsl(var(--step-active))] text-white"
                      : "bg-sidebar-border text-sidebar-foreground/60"
                  )}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
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
            Imprimir / PDF
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <header className="no-print border-b px-6 py-3 flex items-center justify-between bg-card">
          <div>
            <p className="text-xs text-muted-foreground">
              Etapa {currentStep + 1} de {steps.length}
            </p>
            <h2 className="text-lg font-semibold text-foreground">
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
            <Button size="sm" onClick={markComplete}>
              {currentStep < steps.length - 1 ? (
                <>
                  Concluir e Avançar
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                "Finalizar Mapeamento"
              )}
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <StepComponent />
        </div>
      </main>
    </div>
  );
}
