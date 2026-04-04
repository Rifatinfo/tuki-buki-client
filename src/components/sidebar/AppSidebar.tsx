"use client";

import { filterNavByRole } from "@/utiles/filterNav";
import { NAV_MAIN, NAV_SECONDARY } from "./nav-config";

import { NavMain } from "./NavMain";
import { NavSecondary } from "./NavSecondary";
import { NavUser } from "./NavUser";
import { UserRole } from "@/types/role";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import Image from "next/image";

export function AppSidebar() {
    //  replace with real auth
    const user: { role: UserRole; email: string , avatar : string, name:string} = {
        name: "Md Rifat Hossain",
        role: "ADMIN",
        email: "mdrifathossainsinfo@gmail.com",
        avatar: "https://i.pravatar.cc/100", 
    };
    if (!user) return null
    const navMain = filterNavByRole(NAV_MAIN, user.role);
    const navSecondary = filterNavByRole(NAV_SECONDARY, user.role);

    return (
        <Sidebar collapsible="offcanvas">

            {/* HEADER */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/dashboard" className="mb-4">
                                <Image className="block dark:hidden" src="https://res.cloudinary.com/dgp5rqeqh/image/upload/v1773219843/Untitled_design__1_-removebg-preview_vkj6ii.png" width={150} height={80} alt='Black Logo'></Image>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* CONTENT */}
            <SidebarContent>
                <NavMain items={navMain} />

                {/* push bottom */}
                <div className="mt-auto">
                    <NavSecondary items={navSecondary} />
                </div>
            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>

        </Sidebar>
    );
}