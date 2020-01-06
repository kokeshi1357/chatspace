require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }  #letを利用してテスト中使用するインスタンスを定義
  let(:user) { create(:user) }

  describe '#index' do
    context 'log in' do  #ログインしている場合のテスト
      before do          #exampleが実行される直前に、毎回実行
        login user
        get :index, params: { group_id: group.id }
      end

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'renders index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do   #ログインしていない場合のテスト
      before do               #exampleが実行される直前に、毎回実行
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
  

  describe '#create' do     #letメソッドを用いてparamsを定義
  let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'log in' do     #ログインしている場合のテスト
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'count up message' do     #Messageモデルのレコードの総数が1個増えたか確認
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject                   #実際のリダイレクト先を記入
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do   #invalid_paramsを引数にし、意図的にメッセージの保存失敗を再現
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do    #ログインしていない場合のテスト
      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
