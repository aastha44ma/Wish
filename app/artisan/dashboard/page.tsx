import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  Star,
  Package,
  Settings,
  LogOut,
  DollarSign,
  Eye,
  Heart,
  Upload,
  Edit,
  Calendar,
} from "lucide-react"
import Link from "next/link"

export default function ArtisanDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold text-gray-900">KalaDwar</span>
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/indian-artisan-smile.png" />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, Priya!</h1>
              <p className="text-gray-600">Mandala Artist from Rajasthan</p>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">4.9 (127 reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Active Orders</p>
                          <p className="text-2xl font-bold text-gray-900">5</p>
                        </div>
                        <Package className="w-8 h-8 text-orange-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">This Month</p>
                          <p className="text-2xl font-bold text-gray-900">₹45,200</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Profile Views</p>
                          <p className="text-2xl font-bold text-gray-900">1,247</p>
                        </div>
                        <Eye className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Favorites</p>
                          <p className="text-2xl font-bold text-gray-900">89</p>
                        </div>
                        <Heart className="w-8 h-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Active Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle>Active Projects</CardTitle>
                    <CardDescription>Manage your ongoing commissions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">Custom Mandala Wall Art</h3>
                          <p className="text-sm text-gray-600">for Arjun Patel • ₹8,500</p>
                        </div>
                        <Badge variant="secondary">In Progress</Badge>
                      </div>
                      <Progress value={65} className="mb-2" />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>65% Complete</span>
                        <span>Due: March 25, 2024</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <Button size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat with Client
                        </Button>
                        <Button size="sm" variant="outline">
                          Update Progress
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">Lotus Pattern Canvas</h3>
                          <p className="text-sm text-gray-600">for Meera Singh • ₹6,200</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Awaiting Approval</Badge>
                      </div>
                      <Progress value={90} className="mb-2" />
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>90% Complete</span>
                        <span>Waiting for client feedback</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <Button size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Follow Up
                        </Button>
                        <Button size="sm" variant="outline">
                          View Submission
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payment received</p>
                        <p className="text-xs text-gray-600">₹8,500 for Blue Gold Mandala Canvas</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New project inquiry</p>
                        <p className="text-xs text-gray-600">Rahul Kumar wants a custom wedding invitation design</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Profile viewed</p>
                        <p className="text-xs text-gray-600">Your profile was viewed 23 times today</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Work
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Calendar className="w-4 h-4 mr-2" />
                      Set Availability
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Messages (3)
                    </Button>
                  </CardContent>
                </Card>

                {/* Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>This Month's Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Orders Completed</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Rating</span>
                      <span className="font-semibold">4.9/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Response Time</span>
                      <span className="font-semibold">2.3 hrs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completion Rate</span>
                      <span className="font-semibold">98%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Earnings Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Available Balance</span>
                      <span className="font-semibold text-green-600">₹12,450</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Pending Payments</span>
                      <span className="font-semibold text-orange-600">₹8,200</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">This Year Total</span>
                      <span className="font-semibold">₹2,84,500</span>
                    </div>
                    <Button size="sm" className="w-full">
                      Withdraw Funds
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Projects</CardTitle>
                <CardDescription>Manage all your client projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Project filters and list would go here */}
                  <p className="text-gray-600">Project management interface coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Management</CardTitle>
                <CardDescription>Showcase your best work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Portfolio management interface would go here */}
                  <p className="text-gray-600">Portfolio management interface coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings & Analytics</CardTitle>
                <CardDescription>Track your income and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Earnings analytics would go here */}
                  <p className="text-gray-600">Detailed earnings analytics coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
