"use client";

import { MoreHorizontal, Eye, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function UserActions({ user }: { user: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-9 w-9 inline-flex items-center justify-center rounded-md text-brand-muted hover:text-brand-dark hover:bg-brand-rose/5 transition-colors">
        <MoreHorizontal size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border-brand-rose/10">
        <Link href={`/admin/users/${user.id}`}>
          <DropdownMenuItem className="cursor-pointer text-brand-dark gap-2 py-2.5">
            <Eye size={16} />
            View Details
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator className="bg-brand-rose/5" />
        <DropdownMenuItem 
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 gap-2 py-2.5"
          onClick={() => alert(`Mock: Are you sure you want to remove ${user.name}?`)}
        >
          <Trash2 size={16} />
          Remove User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
