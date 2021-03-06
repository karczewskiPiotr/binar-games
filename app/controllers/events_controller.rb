class EventsController < ApplicationController
  before_action :find_event, only: [:show]
  before_action :authenticate_user!

  def index
    @events = Event.where(owner: current_user.id).order('created_at DESC')
  end

  def create
    @game = Game.pluck(:title)
    @event = current_user.events.build(event_params)
    if @event.save
      params[:event][:achivements]&.map do |achivement|
        @event.achivements.create(name: achivement)
      end
      redirect_to @event
    else
      render 'new'
    end
  end

  def new
    @event = current_user.events.build
    @users = User.all
    @game = Game.pluck(:title)
  end

  def results
    User.find(params[:first_id]).first!
    User.find(params[:second_id]).second!
    User.find(params[:third_id]).third!
    @event = Event.find(params[:event_id])
    @event.update(finalised: true)
    redirect_to @event
  end

  private

  def event_params
    params.require(:event).permit(:title, :description, :event_time, :event_date, :private, user_ids: []).
      merge(owner_id: current_user.id, game_id: Game.find_by(title: params[:event][:game]).id)
  end

  def find_event
    @event = Event.find(params[:id])
  end
end
