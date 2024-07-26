import NavigationBar from '@/components/guest/Header'
import Footer from '@/components/guest/root/footer'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <NavigationBar />
            {children}
        </div>
    )
}
