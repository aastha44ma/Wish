import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif text-orange-900">Welcome to KalaDwar!</CardTitle>
            <CardDescription className="text-orange-700">Check your email to confirm your account</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-orange-600">
              We've sent you a confirmation email. Please check your inbox and click the confirmation link to activate
              your artisan account.
            </p>
            <div className="space-y-2">
              <Link href="/artisan/login">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Go to Login</Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
