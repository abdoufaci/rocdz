import ClientHeader from "./_components/client-header";

function ClientMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <ClientHeader />
      <div>{children}</div>
    </main>
  );
}

export default ClientMainLayout;
