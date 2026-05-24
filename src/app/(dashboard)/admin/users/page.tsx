// src/app/(dashboard)/admin/users/page.tsx
import { getMockData } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserActions } from "@/components/admin/UserActions";

export default async function UserManagementPage() {
  const users = await getMockData<any[]>("users.json");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-brand-dark mb-2">User Management</h1>
        <p className="text-brand-muted">Manage roles, subscriptions, and access for all academy members.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-brand-rose/5 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={18} />
          <Input placeholder="Search by name or email..." className="pl-10 border-brand-rose/10 focus:ring-brand-rose" />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="border-brand-rose/20 text-brand-dark gap-2 flex-1 md:flex-none">
            <Filter size={18} /> Filter
          </Button>
          <Button className="bg-brand-dark text-white flex-1 md:flex-none">Export CSV</Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-brand-rose/5 overflow-hidden">
        <Table>
          <TableHeader className="bg-brand-ivory/50">
            <TableRow className="border-brand-rose/10 hover:bg-transparent">
              <TableHead className="font-bold text-brand-dark">Student</TableHead>
              <TableHead className="font-bold text-brand-dark">Role</TableHead>
              <TableHead className="font-bold text-brand-dark">Plan</TableHead>
              <TableHead className="font-bold text-brand-dark text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-brand-rose/5 hover:bg-brand-ivory/20">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-brand-rose/10 text-brand-rose text-xs font-bold">
                        {user.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-brand-dark">{user.name}</p>
                      <p className="text-xs text-brand-muted">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(
                    "font-bold text-[10px] uppercase tracking-widest",
                    user.role === "ADMIN" ? "border-brand-gold text-brand-gold" : "border-brand-rose text-brand-rose"
                  )}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-medium text-brand-dark">Pro Plan</span>
                </TableCell>
                <TableCell className="text-right">
                  <UserActions user={user} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
