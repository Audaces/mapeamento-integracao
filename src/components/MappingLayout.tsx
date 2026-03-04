// ... (mantenha os imports do topo iguais)

export default function MappingLayout() {
  // ... (mantenha a lógica de state igual)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - Oculta na impressão */}
      <aside className="no-print w-64 shrink-0 bg-sidebar-background text-sidebar-foreground flex flex-col border-r border-sidebar-border">
        {/* REDUZI O ESPAÇO AQUI: mudei de p-6 para p-3 */}
        <div className="p-3 border-b border-sidebar-border">
          {/* COR PERSONALIZADA: Aplicada aqui */}
          <h1 className="text-xl font-bold tracking-tight" style={{ color: '#283578' }}>
            Audaces
          </h1>
          <p className="text-[10px] mt-0.5" style={{ color: '#283578', opacity: 0.8 }}>
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
                  style={isActive && !isComplete ? { backgroundColor: '#283578' } : {}}
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

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
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
              style={{ backgroundColor: '#283578' }}
              className="hover:opacity-90"
            >
              {currentStep < steps.length - 1 ? (
                <>Próximo <ChevronRight className="w-4 h-4 ml-1" /></>
              ) : (
                "Finalizar"
              )}
            </Button>
          </div>
        </header>

        {/* Conteúdo visível na tela */}
        <div className="flex-1 overflow-auto p-6 print:hidden">
          <StepComponent />
        </div>

        {/* ESTRUTURA DO PDF - Uma página por step */}
        <div className="hidden print:block">
          {stepComponents.map((Component, index) => (
            <section key={index} className="print-page-section p-10">
              <div className="flex justify-between items-center border-b-2 pb-4 mb-8" style={{ borderColor: '#283578' }}>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: '#283578' }}>Audaces</h1>
                  <p className="text-sm text-gray-500">Mapeamento de Dados ERP</p>
                </div>
                <div className="text-right text-xs text-gray-400">
                  Parte {index + 1} de {steps.length}<br />
                  {steps[index].title}
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-bold mb-6" style={{ color: '#283578' }}>
                  {steps[index].id}. {steps[index].title}
                </h3>
                <Component />
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
