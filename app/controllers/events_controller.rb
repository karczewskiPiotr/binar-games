class EventsController < ApplicationController
    before_action :find_event, only: [:index, :show]
    def index
        @events = Event.all.order('created_at DESC')
    end
    def create
        @event = current_user.events.build(event_params)

		if @event.save
			redirect_to @event
		else
			render 'new'
		end

    end
    def new
        @event = current_user.events.build
    end
    def edit

    end
    def show
        
    end
    def update

    end
    def destroy

    end
    private
    def event_params 
        params.require(:event).permit(:title, :description, :event_time, :event_date)
    end
    def find_event
        @event = Event.find(params[:id])
    end
end
