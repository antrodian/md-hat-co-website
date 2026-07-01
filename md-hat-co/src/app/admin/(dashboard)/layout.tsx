import Logo from "@/components/Logo";
import AdminNav from "@/components/admin/AdminNav";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F2EEE6]">
      <header className="bg-[#211A12] px-6 py-4 flex items-center justify-between gap-6 border-b border-[#6B4F33]/25">
        <div className="flex items-center gap-8">
          <Logo dark className="scale-90 origin-left" />
          <AdminNav />
        </div>
        <LogoutButton />
      </header>
      <main className="px-6 py-10 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
