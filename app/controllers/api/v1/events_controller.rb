class Api::V1::EventsController < ApiController
  def index
    @events = Event.all
  end
end
