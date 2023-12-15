import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'
import React, {useRef, useState} from 'react'
import { Modalize } from 'react-native-modalize'
import CancelButton from '../atoms/cancel_button'
import SaveConfirmButton from '../atoms/save_confirm_button'
import SuccessModal from '../organisms/modals/success_modal'
import DebitItem from '../organisms/debit_item'

const ShowAllDebitsScreen = ({route}) => {

    var { debits } = route.params
    var { debitOpen } = route.params
    var { refreshLists } = route.params

    const [isVisiblePaySuccessModal, setPaySuccessModalVisible] = useState(false);
    const [isPayedDebitOpen, setPayedDebitOpen] = useState(false)

    const modalizeRef = useRef(null);

    onOpen = (event) => {
      event.persist();
      if (modalizeRef.current) {
        modalizeRef.current.open();
      } else {
        console.error('Modalize is not initialized or mounted.');
      }
    };

    async function payDebit()  {
      try{
        const response = await debitController.payDebit(debitOpen.id)
        console.log("payDebit: " + payDebit)
        refreshLists()
        setPaySuccessModalVisible(true)
        setPayedDebitOpen(true)
      } catch (error){
        setErrorPayModalVisible(true)
      }
    }

    const renderItem = ({ item, index }) => (
      <View>
        <View style={{height: index == 0 ? 30 : 0}}/>
          <DebitItem item={item} onClickButton={onOpen} isPayed={isPayedDebitOpen} isDebitOpen={!debitOpen ? false : item.id === debitOpen.id}/>
        <View style={{height: index == debits.length - 1 ? 20 : 0}}/>
      </View>
    );

  return (
    <View style={styles.screen}>
        <FlatList
          data={debits}
          renderItem={renderItem}
        />

        <Modalize
        ref={modalizeRef}
        snapPoint={200}
        panGestureEnabled={false}
        onContentSizeChange={(width, height) => {
          console.log('Layout do Modalize:', { width, height });
        }}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Ao confirmar, essa dívida será quitada. Deseja realmente confirmar?</Text>
          <View style={styles.rowButtons}>
            <CancelButton onPress={() => modalizeRef.current.close()}/>
            <SaveConfirmButton isAble={true} onPress={() => {
                setPaySuccessModalVisible(true)
                modalizeRef.current.close()
                payDebit()
              }} text='Confirmar'/>
          </View>
        </View>
      </Modalize>

      {isVisiblePaySuccessModal && (
        <SuccessModal
          text="Dívida paga com sucesso!"
          onClose={() => {
            setPaySuccessModalVisible(false)
          }}
        />
      )}  

    </View>
  )
}

export default ShowAllDebitsScreen

const styles = StyleSheet.create({
    screen: {
        height: Dimensions.get('screen').height,
        flex: 1
      },
      modalContent: {
        height: 200,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      },
      modalText: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: "OpenSans SemiBold",
        marginBottom: 20
      },
      rowButtons: {
        flexDirection: 'row',
        alignSelf: 'center'
      },
})