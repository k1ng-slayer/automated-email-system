import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import { sendCustomizeEmails, sendDefaulterEmails } from "./api/emailApi";
import { AppHeader } from "./components/AppHeader";
import { routeTitle } from "./constants/routes";
import { currentPath, isValidPath } from "./lib/router";
import { DashboardPage } from "./pages/DashboardPage";
import { InstructionsPage } from "./pages/InstructionsPage";
import { SuccessPage } from "./pages/SuccessPage";
import { WorkflowFormPage } from "./pages/WorkflowFormPage";
import type {
  LastRun,
  RoutePath,
  SharedFieldState,
  Workflow,
  WorkflowFormState,
} from "./types/email";

const initialShared: SharedFieldState = {
  email: "",
  password: "",
  sheetName: "Sheet1",
};
const initialFormState: WorkflowFormState = {
  subject: "",
  threshold: "75",
  message: "",
  file: null,
  error: null,
  sending: false,
};
const connectionError = "Unable to connect to backend.";

function App() {
  const [path, setPath] = useState<RoutePath>(currentPath());
  const [shared, setSharedState] = useState<SharedFieldState>(initialShared);
  const [defaulter, setDefaulter] =
    useState<WorkflowFormState>(initialFormState);
  const [customize, setCustomize] =
    useState<WorkflowFormState>(initialFormState);
  const [lastRun, setLastRun] = useState<LastRun>(null);

  useEffect(() => {
    const onPopState = () => {
      const pathname = window.location.pathname;
      setPath(isValidPath(pathname) ? pathname : "/");
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const pageTitle = useMemo(() => routeTitle(path), [path]);

  function navigate(nextPath: RoutePath) {
    if (nextPath === path) return;
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
  }

  function setShared(next: Partial<SharedFieldState>) {
    setSharedState((prev) => ({ ...prev, ...next }));
  }

  function setWorkflowState(
    workflow: Workflow,
    next: Partial<WorkflowFormState>,
  ) {
    const setter = workflow === "defaulter" ? setDefaulter : setCustomize;
    setter((prev) => ({ ...prev, ...next }));
  }

  function resetWorkflowForm(workflow: Workflow) {
    setSharedState(initialShared);
    if (workflow === "defaulter") {
      setDefaulter(initialFormState);
    } else {
      setCustomize(initialFormState);
    }
  }

  async function handleSubmit(
    workflow: Workflow,
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const state = workflow === "defaulter" ? defaulter : customize;
    setWorkflowState(workflow, { error: null });

    if (!state.file) {
      setWorkflowState(workflow, { error: "Please upload an Excel file." });
      return;
    }

    setWorkflowState(workflow, { sending: true });
    try {
      const result =
        workflow === "defaulter"
          ? await sendDefaulterEmails(shared, {
              message: state.message,
              threshold: state.threshold,
              file: state.file,
            })
          : await sendCustomizeEmails(shared, {
              subject: state.subject,
              message: state.message,
              file: state.file,
            });

      if (
        workflow === "customize" &&
        result.sent_count === 0 &&
        result.failures.length > 0
      ) {
        setWorkflowState("customize", {
          error:
            "No emails were sent. Verify that your sheet contains a valid Email column and check backend logs for details.",
        });
        return;
      }

      setLastRun({ workflow, result });
      resetWorkflowForm(workflow);
      navigate("/success");
    } catch (error) {
      setWorkflowState(workflow, {
        error: error instanceof Error ? error.message : connectionError,
      });
    } finally {
      setWorkflowState(workflow, { sending: false });
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffafc] via-[#fff5f7] to-[#fffafc] text-[#2f1a24]">
      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
        <AppHeader title={pageTitle} />
        <section className="mt-6">{renderPage()}</section>
      </div>
    </main>
  );

  function renderPage() {
    if (path === "/") {
      return (
        <DashboardPage
          onOpenDefaulterInstructions={() =>
            navigate("/instructions/defaulter")
          }
          onStartDefaulter={() => navigate("/workflow/defaulter")}
          onOpenCustomizeInstructions={() =>
            navigate("/instructions/customize")
          }
          onStartCustomize={() => navigate("/workflow/customize")}
        />
      );
    }

    if (path === "/instructions/defaulter") {
      return (
        <InstructionsPage
          title="Defaulter Instructions"
          points={[
            "Enter sender email and password/app password carefully.",
            "Use a valid spreadsheet where the last column is attendance.",
            "Keep student email IDs in the second-last column.",
            "Choose a threshold between 0 and 100 before submitting.",
          ]}
          onNext={() => navigate("/workflow/defaulter")}
        />
      );
    }

    if (path === "/instructions/customize") {
      return (
        <InstructionsPage
          title="Customize Instructions"
          points={[
            "Enter sender email and password/app password carefully.",
            "Provide a non-empty subject and message.",
            "Upload a valid Excel file with receiver email IDs in the last column.",
          ]}
          onNext={() => navigate("/workflow/customize")}
        />
      );
    }

    if (path === "/workflow/defaulter") {
      return (
        <WorkflowFormPage
          workflow="defaulter"
          shared={shared}
          setShared={setShared}
          state={defaulter}
          onSubjectChange={(value) =>
            setWorkflowState("defaulter", { subject: value })
          }
          onThresholdChange={(value) =>
            setWorkflowState("defaulter", { threshold: value })
          }
          onMessageChange={(value) =>
            setWorkflowState("defaulter", { message: value })
          }
          onFileChange={(file) => setWorkflowState("defaulter", { file })}
          onSubmit={(event) => handleSubmit("defaulter", event)}
        />
      );
    }

    if (path === "/workflow/customize") {
      return (
        <WorkflowFormPage
          workflow="customize"
          shared={shared}
          setShared={setShared}
          state={customize}
          onSubjectChange={(value) =>
            setWorkflowState("customize", { subject: value })
          }
          onThresholdChange={(value) =>
            setWorkflowState("customize", { threshold: value })
          }
          onMessageChange={(value) =>
            setWorkflowState("customize", { message: value })
          }
          onFileChange={(file) => setWorkflowState("customize", { file })}
          onSubmit={(event) => handleSubmit("customize", event)}
        />
      );
    }

    return (
      <SuccessPage lastRun={lastRun} onBackToDashboard={() => navigate("/")} />
    );
  }
}

export default App;
